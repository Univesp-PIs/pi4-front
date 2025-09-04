import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { IResponseListProjects } from '@/@types/project'
import { AdminContext } from '@/contexts/AdminContext'
import { useDeleteProject } from '@/hooks/projects/deleteProject'
import { useListProjects } from '@/hooks/projects/listProjects'

export function useProjects() {
  const [search, setSearch] = useState('')
  const [ascOrDescTable, setAscOrDescTable] = useState({
    data: 'asc',
    project: 'asc',
  })
  const [sortedProjects, setSortedProjects] = useState<IResponseListProjects[]>(
    [],
  )

  const [isCopied, setIsCopied] = useState({
    id: 0,
    status: false,
    link: '',
  })

  function handleCopy(id: number, value: string) {
    navigator.clipboard.writeText(value)
    setIsCopied({
      id,
      status: true,
      link: value,
    })
    toast.success('Chave copiada!')
    setTimeout(() => {
      setIsCopied({
        id: 0,
        status: false,
        link: '',
      })
    }, 2000)
  }

  const getProjectStatus = (project: IResponseListProjects) => {
    // Se todos os passos estão concluídos, o projeto está finalizado
    const allProjectIsDone = project.timeline.every(
      (step) => step.ranking.note === 'done',
    )

    if (allProjectIsDone) {
      return 'Finalizado'
    }

    // Se algum passo está em progresso, mostra o nome desse status
    const stepInProgress = project.timeline.find(
      (step) => step.ranking.note === 'in progress',
    )

    if (stepInProgress) {
      return stepInProgress.ranking.condition.name
    }

    // Se nenhum passo está em progresso e nem todos estão concluídos, o projeto não foi iniciado
    return 'Não iniciado'
  }

  const {
    data: dataListProjects,
    isLoading: isLoadingListProjects,
    error: errorListProjects,
    isFetching: isFetchingListProjects,
    refetch: refetchListProjects,
  } = useListProjects()

  const {
    mutateAsync: mutateDeleteProject,
    isPending: isPendingDeleteProject,
    variables: variablesDeleteProject,
  } = useDeleteProject()

  async function handleDeleteProject(id: number) {
    await mutateDeleteProject(id)
  }

  const router = useRouter()

  const { setTitleHeader } = useContext(AdminContext)

  useEffect(() => {
    setTitleHeader('Painel do Administrador')
  }, [setTitleHeader])

  useEffect(() => {
    if (dataListProjects) {
      setSortedProjects(dataListProjects)
    }
  }, [dataListProjects])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // função do filteredProjects
  useEffect(() => {
    if (dataListProjects) {
      const filtered = dataListProjects.filter(
        (project: IResponseListProjects) => {
          const searchLower = search.toLowerCase()
          return (
            project.client.name.toLowerCase().includes(searchLower) ||
            project.client.email.toLowerCase().includes(searchLower) ||
            project.project.name.toLowerCase().includes(searchLower) ||
            project.project.key?.toLowerCase().includes(searchLower)
          )
        },
      )

      // Ordena por data OU por nome, nunca os dois juntos
      if (ascOrDescTable.data) {
        filtered.sort((a, b) => {
          const dateA = new Date(a.project.created_at!).getTime()
          const dateB = new Date(b.project.created_at!).getTime()
          return ascOrDescTable.data === 'asc' ? dateA - dateB : dateB - dateA
        })
      } else if (ascOrDescTable.project) {
        filtered.sort((a, b) => {
          return ascOrDescTable.project === 'asc'
            ? a.project.name.localeCompare(b.project.name)
            : b.project.name.localeCompare(a.project.name)
        })
      }

      setSortedProjects(filtered)
    }
  }, [search, dataListProjects, ascOrDescTable])

  // Função para ordenar projetos
  function handleSort(option: 'data' | 'project') {
    setAscOrDescTable((prev) => ({
      data: option === 'data' ? (prev.data === 'asc' ? 'desc' : 'asc') : '',
      project:
        option === 'project' ? (prev.project === 'asc' ? 'desc' : 'asc') : '',
    }))
  }

  return {
    search,
    ascOrDescTable,
    isPendingDeleteProject,
    variablesDeleteProject,
    isFetchingListProjects,
    isLoadingListProjects,
    errorListProjects,
    router,
    sortedProjects,
    isCopied,
    getProjectStatus,
    handleSearch,
    handleSort,
    handleCopy,
    refetchListProjects,
    handleDeleteProject,
  }
}
