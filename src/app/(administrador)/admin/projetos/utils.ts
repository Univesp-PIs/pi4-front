import toast from 'react-hot-toast'

import { ICreateProjectParams, IResponseGetProject } from '@/@types/project'
import { toBackendDate } from '@/utils'

export function validateProject(data: IResponseGetProject): boolean {
  if (!data.project.name) {
    toast.error('O nome do projeto é obrigatório')
    return true
  }

  if (!data.client.name) {
    toast.error('O nome do cliente é obrigatório')
    return true
  }

  if (!data.timeline.length) {
    toast.error('É necessário adicionar pelo menos uma etapa')
    return true
  }

  if (!data.information.cost_estimate) {
    toast.error('O custo estimado é obrigatório')
    return true
  }

  if (!data.information.current_cost) {
    toast.error('O custo atual é obrigatório')
    return true
  }

  if (!data.information.start_date) {
    toast.error('A data de início é obrigatória')
    return true
  }

  if (!data.information.delivered_date) {
    toast.error('A data estimada de entrega é obrigatória')
    return true
  }

  const hasEmptyCondition = data.timeline.some(
    (step) =>
      !step.ranking.condition ||
      !step.ranking.condition.id ||
      step.ranking.condition.id === '0',
  )

  if (hasEmptyCondition) {
    toast.error('É necessário selecionar uma opção para cada etapa')
    return true
  }

  return false
}

export function formatedProject(
  data: IResponseGetProject,
): ICreateProjectParams {
  return {
    project: {
      id: data.project.id,
      name: data.project.name,
    },
    information: {
      start_date: toBackendDate(data.information.start_date),
      cost_estimate: data.information.cost_estimate,
      current_cost: data.information.current_cost,
      delivered_date: toBackendDate(data.information.delivered_date),
      current_date: toBackendDate(data.information.current_date),
    },
    client: {
      name: data.client.name,
      email: data.client.email,
    },
    timeline: data.timeline.map((step, index) => ({
      ranking: {
        id: Number(step.ranking.id) || 0,
        rank: String(index + 1),
        last_update: toBackendDate(step.ranking.last_update),
        note: step.ranking.note,
        description: step.ranking.description,
        condition: {
          id: Number(step.ranking.condition.id),
        },
      },
    })),
  }
}
