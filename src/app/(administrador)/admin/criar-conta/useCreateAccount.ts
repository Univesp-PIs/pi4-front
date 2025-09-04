'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { AdminContext } from '@/contexts/AdminContext'
import { useCreateUserAdmin } from '@/hooks/users/createUserAdmin'

const schema = z
  .object({
    name: z.string().min(1, 'Digite o nome'),
    email: z.string().email('Digite um email válido'),
    password: z.string().min(1, 'Digite a senha de acesso'),
    password_confirm: z.string().min(1, 'Digite a confirmação da senha'),
    code_security: z.string().min(1, 'Digite o código de segurança'),
  })
  .refine(
    (data) => {
      return data.password === data.password_confirm
    },
    {
      message: 'As senhas não conferem',
      path: ['password_confirm'],
    },
  )

export type schemaCreateAccountProps = z.infer<typeof schema>

export function useCreateAccount() {
  const { setTitleHeader } = useContext(AdminContext)
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const {
    mutateAsync: mutateCreateUserAdmin,
    isPending: isPendingCreateUserAdmin,
  } = useCreateUserAdmin()

  const {
    register,
    // reset,
    formState: { errors },
    handleSubmit,
  } = useForm<schemaCreateAccountProps>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    setTitleHeader('Criar conta')
  }, [setTitleHeader])

  async function handleCreateAccount(data: schemaCreateAccountProps) {
    if (!data.code_security) {
      toast.error('Digite o código de segurança')
    }

    await mutateCreateUserAdmin({
      name: data.name,
      email: data.email,
      password: data.password,
      auth_code: data.code_security,
    })

    router.push('/admin/login')
  }

  return {
    errors,
    isSubmitting: isPendingCreateUserAdmin,
    showPassword,
    register,
    handleSubmit,
    handleCreateAccount,
    setShowPassword,
  }
}
