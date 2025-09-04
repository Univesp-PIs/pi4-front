import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { queryClient } from '@/services/queryClient'

const fetchDeleteProject = async (id: number) => {
  const { data } = await api.delete(`/engsol/delete_project?id=${id}`)

  return data
}

export const useDeleteProject = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: fetchDeleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['list-projects'],
      })

      toast.success('Projeto deletado com sucesso')
      router.push('/admin/projetos')
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.log(error.response.data.error)
      toast.error('Erro ao deletar projeto')
    },
  })
}
