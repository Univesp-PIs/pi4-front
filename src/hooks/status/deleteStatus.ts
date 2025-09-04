import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { queryClient } from '@/services/queryClient'

const fetchDeleteStatus = async (id: string) => {
  const { data } = await api.delete(`/engsol/delete_condition`, {
    params: {
      id,
    },
  })

  return data
}

export const useDeleteStatus = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: fetchDeleteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-status'],
      })

      queryClient.invalidateQueries({
        queryKey: ['list-status'],
      })

      toast.success('Status deletado com sucesso')
      router.push('/admin/status')
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.log(error.response.data.error)
      toast.error('Erro ao deletar status')
    },
  })
}
