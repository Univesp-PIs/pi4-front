'use client'

import { createContext, ReactNode, useState } from 'react'

interface AdminContextType {
  titleHeader: string
  setTitleHeader: (title: string) => void
}

export const AdminContext = createContext({} as AdminContextType)

interface AdminContextProviderProps {
  children: ReactNode
}

export function AdminContextProvider({ children }: AdminContextProviderProps) {
  const [titleHeader, setTitleHeader] = useState('')

  return (
    <AdminContext.Provider
      value={{
        titleHeader,
        setTitleHeader,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
