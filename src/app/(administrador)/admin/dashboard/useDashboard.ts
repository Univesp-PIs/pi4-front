import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import { AdminContext } from '@/contexts/AdminContext'
import { useGetDashboard } from '@/hooks/dashboard/getDashboard'
import { useListProjects } from '@/hooks/projects/listProjects'

export function useDashboard() {
  const { setTitleHeader } = useContext(AdminContext)

  const [filterSelected, setFilterSelected] = useState({
    year: new Date().getFullYear(),
    projectsIds: [] as number[],
  })

  const router = useRouter()

  const {
    data: dataDashboard,
    isLoading: isLoadingDashboard,
    isFetching: isFetchingDashboard,
    error: errorDashboard,
    refetch: refetchDashboard,
  } = useGetDashboard(filterSelected.year, filterSelected.projectsIds)

  const { data: dataListProjects, isLoading: isLoadingListProjects } =
    useListProjects()

  // criar um array com o ano atual e os 4 anos anteriores
  const yearsProject = Array.from(
    { length: 5 },
    (_, index) => new Date().getFullYear() - index,
  )

  const projectsOptions =
    dataListProjects?.map((project) => ({
      id: project.project.id,
      name: project.project.name,
    })) ?? []

  useEffect(() => {
    if (
      dataListProjects &&
      dataListProjects.length > 0 &&
      filterSelected.projectsIds.length === 0
    ) {
      setFilterSelected({
        ...filterSelected,
        // pegar os 3 primeiros projetos
        projectsIds: dataListProjects.map((item) => item.project.id),
      })
    }
  }, [dataListProjects, filterSelected, setFilterSelected])

  useEffect(() => {
    setTitleHeader('Dashboard')
  }, [setTitleHeader])

  useEffect(() => {
    refetchDashboard()
  }, [filterSelected, refetchDashboard])

  return {
    projectsOptions,
    errorDashboard,
    isLoadingDashboard,
    isLoadingListProjects,
    isFetchingDashboard,
    dataDashboard,
    filterSelected,
    router,
    yearsProject,
    refetchDashboard,
    setFilterSelected,
  }
}
