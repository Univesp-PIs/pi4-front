import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { IUpdateStatus } from '@/@types/status'
import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { queryClient } from '@/services/queryClient'

const fetchUpdateStatus = async (params: IUpdateStatus) => {
  const { data } = await api.put(`/engsol/update_condition`, {
    ...params,
  })

  return data
}

export const useUpdateStatus = () => {
  return useMutation({
    mutationFn: fetchUpdateStatus,
    onSuccess: () => {
      toast.success('Status editado com sucesso')

      queryClient.invalidateQueries({
        queryKey: ['list-status'],
      })
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.log(error.response.data.error)
      toast.error('Erro ao atualizar status')
    },
  })
}
