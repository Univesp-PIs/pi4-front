import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { ICreateProjectParams } from '@/@types/project'
import { api } from '@/services/apiClient'
import { AxiosErrorWithMessage } from '@/services/errorMessage'
import { queryClient } from '@/services/queryClient'

const fetchCreateProject = async (params: ICreateProjectParams) => {
  const { data } = await api.post(`/engsol/create_project`, {
    ...params,
  })

  return data
}

export const useCreateProject = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: fetchCreateProject,
    onSuccess: () => {
      toast.success('Projeto criado com sucesso')

      queryClient.invalidateQueries({
        queryKey: ['list-projects'],
      })

      router.push('/admin/projetos')
    },
    onError: (error: AxiosErrorWithMessage) => {
      console.log(error.response.data.error)
      toast.error('Erro ao criar projeto')
    },
  })
}
