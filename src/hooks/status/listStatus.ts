'use client'

import { useQuery } from '@tanstack/react-query'

import { IResponseListStatus } from '@/@types/status'
import { api } from '@/services/apiClient'

const fetchListStatus = async (): Promise<IResponseListStatus[]> => {
  const { data } = await api.get<IResponseListStatus[]>(
    '/engsol/list_condition',
  )

  return data
}

export const useListStatus = () => {
  return useQuery({
    queryKey: ['list-status'],
    queryFn: fetchListStatus,
  })
}
