import { AxiosError, AxiosRequestConfig, AxiosResponseHeaders } from 'axios'

export interface AxiosErrorWithMessage extends AxiosError {
  response: {
    status: number
    statusText: string
    headers: AxiosResponseHeaders
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: AxiosRequestConfig<any>
    data: {
      error: string
    }
  }
}
