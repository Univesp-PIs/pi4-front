export interface IResponseDashboard {
  title: string
  delivery_projects: {
    title: string
    data: {
      month: number
      count: number
      monthName?: string
    }[]
  }
  cost: {
    title: string
    data: {
      name: string
      current_cost: number
      project: {
        id: number
        name: string
        key: string
      }
      information: {
        cost_estimate: number
        current_cost: number
      }
    }[]
  }
  percentage_project_cost: {
    title: string
    value: number
  }
  average_project_cost: {
    title: string
    value: {
      estimate_cost: number
      current_cost: number
    }
  }
  average_time_project: {
    title: string
    value: {
      estimate_days: number
      current_days: number
    }
  }
  percentage_projects_delivered: {
    title: string
    value: number
  }
}
