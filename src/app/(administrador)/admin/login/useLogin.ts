import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { AdminContext } from '@/contexts/AdminContext'
import { AuthContext } from '@/contexts/AuthContex'
const schema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(1, 'Digite a senha de acesso'),
})

type schemaLoginProps = z.infer<typeof schema>

export function useLogin() {
  const { setTitleHeader } = useContext(AdminContext)
  const { signIn, isAuthenticated } = useContext(AuthContext)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  // const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
  const [recaptchaKey, setRecaptchaKey] = useState<number>(0) // Variável para recriar o reCAPTCHA

  // const handleRecaptchaChange = (value: string | null) => {
  //   // Esta função será chamada quando o usuário completar o reCAPTCHA com sucesso.
  //   setRecaptchaValue(value)
  // }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<schemaLoginProps>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    setTitleHeader('Painel do Administrador')
  }, [setTitleHeader])

  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/projetos')
    }
  }, [isAuthenticated, router])

  async function handleLogin(data: schemaLoginProps) {
    setIsSubmitting(true)

    // if (recaptchaValue === null) {
    //   toast.error('Preencha o re-captcha.')
    //   setIsSubmitting(false)
    //   return
    // }

    const fnSignIn = await signIn(data)

    // Incrementa a chave do reCAPTCHA para recriá-lo
    setRecaptchaKey(recaptchaKey + 1)

    setIsSubmitting(false)

    if (fnSignIn) {
      reset()
      router.push('/admin/projetos')
    }
  }

  return {
    register,
    handleSubmit,
    handleLogin,
    errors,
    isSubmitting,
    showPassword,
    setShowPassword,
    recaptchaKey,
  }
}
