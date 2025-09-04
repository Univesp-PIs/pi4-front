import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { queryClient } from '@/services/queryClient'

const fetchCreateStatus = async (name: string) => {
  const { data } = await api.post(`/engsol/create_condition`, {
    name,
  })

  return data
}

export const useCreateStatus = () => {
  return useMutation({
    mutationFn: fetchCreateStatus,
    onSuccess: () => {
      toast.success('Status criado com sucesso')

      queryClient.invalidateQueries({
        queryKey: ['list-status'],
      })
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.log(error.response.data.error)
      toast.error('Erro ao criar status')
    },
  })
}
