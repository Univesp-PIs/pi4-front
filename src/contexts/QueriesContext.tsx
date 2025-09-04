'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { queryClient } from '@/services/queryClient'
// import { ReactQueryDevtools } from 'react-query/types/devtools'

export function ProviderQueryClient({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      {/* <ReactQueryDevtools /> */}
    </>
  )
}
