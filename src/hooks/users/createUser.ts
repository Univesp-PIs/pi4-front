import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import toast from 'react-hot-toast'

import { ICreateUser } from '@/@types/user'
import { AuthContext } from '@/contexts/AuthContex'
import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'

const fetchCreateUser = async (params: ICreateUser) => {
  await api.post('/account/signup', {
    name: params.name,
    email: params.email,
    password: params.password,
  })

  return params
}

export const useCreateUser = () => {
  const { signIn } = useContext(AuthContext)
  const router = useRouter()
  return useMutation({
    mutationFn: fetchCreateUser,
    onSuccess: async (data: ICreateUser) => {
      toast.success('Usuário cadastrado com sucesso')
      try {
        const fnSignIn = await signIn({
          email: data.email,
          password: data.password,
        })

        if (fnSignIn) {
          router.push('/admin/projetos')
        } else {
          toast.error('Falha ao fazer login após o cadastro')
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error('Erro ao fazer login: ' + error.message)
      }
    },
    onError: (error: AxiosErrorWithMessage) => {
      toast.error(error.response.data.error)
    },
  })
}
