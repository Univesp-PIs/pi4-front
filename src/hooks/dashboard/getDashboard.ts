'use client'
import { useQuery } from '@tanstack/react-query'

import { IResponseDashboard } from '@/@types/dashboard'
import { api } from '@/services/apiClient'
import { meses } from '@/utils'

const fetchGetDashboard = async (
  year: number,
  projectsIds?: number[],
): Promise<IResponseDashboard | Record<string, never>> => {
  if (!projectsIds || projectsIds.length === 0) {
    return {}
  }

  const { data } = await api.post<IResponseDashboard>(`/engsol/dashboard`, {
    delivery_projects: {
      year,
    },
    cost: {
      id: projectsIds,
    },
  })

  return {
    ...data,
    delivery_projects: {
      ...data.delivery_projects,
      data: data.delivery_projects.data.map((item) => ({
        ...item,
        monthName: meses[item.month],
      })),
    },
    cost: {
      ...data.cost,
      data: data.cost.data.map((item) => ({
        ...item,
        name: item.project.name,
        current_cost: item.information.current_cost,
        cost_estimate: item.information.cost_estimate,
      })),
    },
  }
}

export const useGetDashboard = (year: number, projectsIds: number[]) => {
  return useQuery({
    queryKey: ['get-dashboard', year, projectsIds],
    queryFn: () => fetchGetDashboard(year, projectsIds),
  })
}
