import { useRouter } from 'next/navigation'
import { FormEvent, useContext, useEffect, useState } from 'react'

import { IResponseGetProject } from '@/@types/project'
import { AdminContext } from '@/contexts/AdminContext'
import { useCreateProject } from '@/hooks/projects/createProject'
import { useListStatus } from '@/hooks/status/listStatus'
import { toInputDate } from '@/utils'

import { formatedProject, validateProject } from '../utils'

export function useCriarProjeto() {
  const router = useRouter()

  const {
    mutateAsync: mutateCreateProject,
    isPending: isPendingCreateProject,
  } = useCreateProject()

  const { data: dataListStatus } = useListStatus()

  const { setTitleHeader } = useContext(AdminContext)
  const [dataApiProject, setDataApiProject] = useState<IResponseGetProject>({
    project: {
      name: '',
      id: 0,
    },
    client: {
      name: '',
      email: '',
      id: 0,
    },
    information: {
      start_date: toInputDate(new Date()),
      cost_estimate: 0,
      current_cost: 0,
      delivered_date: toInputDate(new Date()),
      current_date: toInputDate(new Date()),
    },
    timeline: [
      {
        ranking: {
          id: 0,
          rank: '1',
          last_update: toInputDate(new Date()),
          note: 'waiting',
          description: '',
          condition: {
            id: '0',
            name: '',
          },
        },
      },
    ],
  })

  useEffect(() => {
    setTitleHeader('Criar projeto')
  }, [setTitleHeader, dataApiProject?.project.name])

  async function handleSubmitContact(e: FormEvent) {
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

    // Cria o projeto
    await mutateCreateProject(formattedData)
  }

  const removeStep = (index: number) => {
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
    isPendingCreateProject,
    dataApiProject,
    setDataApiProject,
    handleSubmitContact,
    addStep,
    removeStep,
    moveItemLeft,
    moveItemRight,
    dataListStatus,
  }
}
