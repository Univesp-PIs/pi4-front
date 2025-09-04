type IProject = {
  id: number
  name: string
  key?: string
  created_at?: string
}

type IClient = {
  id?: number
  name: string
  email: string
}

type ITimeline = {
  ranking: {
    id: number
    rank: string
    last_update: string
    note: 'waiting' | 'in progress' | 'done'
    description: string
    condition: {
      id: number | string
      name?: string
    }
  }
}

type IInformation = {
  cost_estimate: number
  current_cost: number
  delivered_date: string
  current_date: string
  start_date: string
}

type IInformation = {
  cost_estimate: number
  current_cost: number
  delivered_date: string
  current_date: string
}

export interface IResponseListProjects {
  average_time?: {
    ranking: number
  }
  project: IProject
  client: IClient
  information: IInformation
  timeline: ITimeline[]
}

export type IResponseGetProject = IResponseListProjects

export interface ICreateProjectParams {
  project: IProject
  client: IClient
  timeline: ITimeline[]
  information: IInformation
}

export type IUpdateProjectParams = IResponseGetProject
