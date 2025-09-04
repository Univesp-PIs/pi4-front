import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { IUpdateProjectParams } from '@/@types/project'
import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { queryClient } from '@/services/queryClient'

const fetchUpdateProject = async (params: IUpdateProjectParams) => {
  const { data } = await api.put(`/engsol/update_project`, {
    ...params,
  })

  return data
}

export const useUpdateProject = () => {
  return useMutation({
    mutationFn: fetchUpdateProject,
    onSuccess: () => {
      toast.success('Projeto editado com sucesso')
      queryClient.invalidateQueries({
        queryKey: ['get-project'],
      })

      queryClient.invalidateQueries({
        queryKey: ['list-projects'],
      })
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.log(error.response.data.error)
      toast.error('Erro ao atualizar projeto')
    },
  })
}
