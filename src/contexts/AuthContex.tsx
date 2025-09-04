/* eslint-disable camelcase */
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import toast from 'react-hot-toast'

import { api } from '../services/apiClient'

type User = {
  token: string
  expiry_timestamp: number
  user_id: string
  user_name: string
  user_email: string
}

type SignInCredentials = {
  password: string
  email: string
}

type AuthContexData = {
  signIn: (credentials: SignInCredentials) => Promise<boolean>
  signOut: () => void
  user: User | undefined
  isAuthenticated: boolean
  setUser: Dispatch<SetStateAction<User | undefined>>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContexData)

let authChannel: BroadcastChannel

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState<User>()

  const isAuthenticated = !!user

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          router.push('/admin/login')
          authChannel.close()
          break
        default:
          authChannel.close()
          break
      }
    }
  }, [router, isAuthenticated])

  useEffect(() => {
    const { 'engsol.data': data } = parseCookies()

    if (data) {
      const { user_id, user_email, expiry_timestamp, user_name, token } =
        JSON.parse(data)
      setUser({ user_id, user_email, expiry_timestamp, user_name, token })
    } else if (
      pathname.includes('admin/criar-conta') ||
      pathname.includes('admin/login')
    ) {
      // eslint-disable-next-line no-useless-return
      return
    } else if (pathname.includes('admin/') || pathname.includes('admin')) {
      router.push('/admin/login')
    }
  }, [router, pathname])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/account/login', {
        email,
        password,
      })

      const { user_id, user_email, expiry_timestamp, user_name, token } =
        response.data.payload

      const timestampFromBackend = expiry_timestamp
      const expiryDateInMillis = timestampFromBackend * 1000 // Converta para milissegundos
      const currentDateInMillis = Date.now()
      const dateExpire = Math.floor(
        (expiryDateInMillis - currentDateInMillis) / 1000,
      ) // Diferença em segundos

      setCookie(null, 'engsol.data', JSON.stringify(response.data.payload), {
        maxAge: dateExpire, // 1 dia
        path: '/',
      })

      setCookie(null, 'engsol.token', token, {
        maxAge: dateExpire, // 1 dia
        path: '/',
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      setUser({
        user_id,
        user_email,
        expiry_timestamp,
        user_name,
        token,
      })

      if (parseCookies()['engsol.token']) {
        toast.success('Login efetuado')
        // Mova a navegação para depois da configuração do token
        router.push('/admin/projetos')
      }

      return true

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error('Usuário ou senha inválidos')
      return false
    }
  }

  function signOut() {
    destroyCookie(null, 'engsol.data', {
      path: '/',
    })
    destroyCookie(null, 'engsol.token', {
      path: '/',
    })
    toast.success('Você saiu da sua conta!')

    authChannel.postMessage('signOut')
    setUser(undefined)

    router.push('/admin/login')
  }
  return (
    <AuthContext.Provider
      value={{ signIn, signOut, isAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
