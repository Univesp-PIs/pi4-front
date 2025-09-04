import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { ICreateUserAdmin } from '@/@types/user'
import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'

const fetchCreateUserAdmin = async (params: ICreateUserAdmin) => {
  const { data } = await api.post('/account/admin/create', {
    ...params,
  })

  return data
}

export const useCreateUserAdmin = () => {
  return useMutation({
    mutationFn: fetchCreateUserAdmin,
    onSuccess: () => {
      toast.success('Usuário admin cadastrado com sucesso')
    },
    onError: (error: AxiosErrorWithMessage) => {
      toast.error(error.response.data.error)
    },
  })
}
