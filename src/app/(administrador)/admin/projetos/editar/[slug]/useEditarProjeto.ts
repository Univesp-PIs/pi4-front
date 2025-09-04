import { useRouter } from 'next/navigation'
import { FormEvent, useContext, useEffect, useState } from 'react'

import { IResponseGetProject } from '@/@types/project'
import { AdminContext } from '@/contexts/AdminContext'
import { useDeleteProject } from '@/hooks/projects/deleteProject'
import { useGetProject } from '@/hooks/projects/getProject'
import { useUpdateProject } from '@/hooks/projects/updateProject'
import { useListStatus } from '@/hooks/status/listStatus'
import { toInputDate } from '@/utils'

import { formatedProject, validateProject } from '../../utils'

export function useEditarProjeto({ params }: { params: { slug: string } }) {
  const router = useRouter()

  const {
    data: dataProject,
    isLoading: isLoadingProject,
    error: errorProject,
  } = useGetProject(params.slug)

  const {
    mutateAsync: mutateUpdateProject,
    isPending: isPendingUpdateProject,
  } = useUpdateProject()

  const {
    mutateAsync: mutateDeleteProject,
    isPending: isPendingDeleteProject,
  } = useDeleteProject()

  const { data: dataListStatus } = useListStatus()

  const { setTitleHeader } = useContext(AdminContext)
  const [dataApiProject, setDataApiProject] = useState<IResponseGetProject>()
  const [timelineDeleted, setTimelineDeleted] = useState<
    IResponseGetProject['timeline']
  >([])

  useEffect(() => {
    setTitleHeader(`Editar projeto: ${dataApiProject?.project.name}`)
  }, [setTitleHeader, dataApiProject?.project.name])

  useEffect(() => {
    if (dataProject && !isLoadingProject) {
      setDataApiProject(dataProject)
    }
  }, [dataProject, isLoadingProject])

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault()

    if (!dataApiProject) {
      return
    }

    // Validações dos dados
    const validation = validateProject(dataApiProject)
    if (validation) {
      return
    }

    const formattedData = formatedProject(dataApiProject)

    const formattedTimelineDeleted = timelineDeleted.map((step) => ({
      ...step,
      ranking: { ...step.ranking, rank: '0', delete: true },
    }))

    const dataToSave = {
      ...formattedData,
      timeline: [...formattedData.timeline, ...formattedTimelineDeleted],
    }

    // Atualiza o projeto
    await mutateUpdateProject(dataToSave)

    setTimelineDeleted([])
  }

  async function handleDeleteProject(id: number) {
    await mutateDeleteProject(id)
  }

  const removeStep = (index: number) => {
    const step = dataApiProject?.timeline[index]

    if (step?.ranking.id) {
      setTimelineDeleted((prev) => [...(prev || []), step])
    }

    setDataApiProject((prevSteps) => {
      const newSteps = prevSteps?.timeline.filter(
        (_, indexValue) => indexValue !== index,
      )
      return { ...prevSteps, timeline: newSteps } as IResponseGetProject
    })
  }

  const addStep = () => {
    const newStep = {
      ranking: {
        id: 0,
        rank: (dataApiProject?.timeline.length
          ? dataApiProject.timeline.length + 1
          : 0
        ).toString(),
        condition: {
          id: '0',
          name: '',
        },
        last_update: toInputDate(new Date()),
        note: 'waiting',
        description: '',
      },
    }
    setDataApiProject((prevSteps) => {
      const newSteps = prevSteps?.timeline
        ? [...prevSteps?.timeline, newStep]
        : [newStep]
      return { ...prevSteps, timeline: newSteps } as IResponseGetProject
    })
  }

  const moveItemLeft = (index: number) => {
    if (index > 0) {
      const newTimeline = [...(dataApiProject?.timeline || [])]
      ;[newTimeline[index - 1], newTimeline[index]] = [
        newTimeline[index],
        newTimeline[index - 1],
      ]
      setDataApiProject(
        (prev) => ({ ...prev, timeline: newTimeline }) as IResponseGetProject,
      )
    }
  }

  const moveItemRight = (index: number) => {
    if (dataApiProject && index < dataApiProject.timeline.length - 1) {
      const newTimeline = [...dataApiProject.timeline]

      // Realiza a troca dos itens
      ;[newTimeline[index + 1], newTimeline[index]] = [
        newTimeline[index],
        newTimeline[index + 1],
      ]

      // Atualiza o estado com o novo array `newTimeline`
      setDataApiProject((prev) => {
        const updatedProject = {
          ...prev,
          timeline: newTimeline,
        } as IResponseGetProject
        return updatedProject
      })
    }
  }

  return {
    router,
    dataApiProject,
    isLoadingProject,
    errorProject,
    isPendingUpdateProject,
    isPendingDeleteProject,
    dataListStatus,
    handleSubmitForm,
    setDataApiProject,
    handleDeleteProject,
    addStep,
    removeStep,
    moveItemLeft,
    moveItemRight,
  }
}
