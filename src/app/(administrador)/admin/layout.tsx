import 'react-circular-progressbar/dist/styles.css'

import type { Metadata } from 'next'

import { Header } from '@/components/Header'
import { AdminContextProvider } from '@/contexts/AdminContext'

export const metadata: Metadata = {
  title: 'EngSol - Admin',
  description: 'Sistema EngSol para consulta de pedidos',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AdminContextProvider>
      <Header />
      {children}
    </AdminContextProvider>
  )
}
