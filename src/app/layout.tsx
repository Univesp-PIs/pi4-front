import './globals.css'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import 'react-tooltip/dist/react-tooltip.css'

import { Roboto } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from '@/contexts/AuthContex'
import { ProviderQueryClient } from '@/contexts/QueriesContext'
import { NetworkStatusNotifier } from '@/utils/networkStatusNotifier'

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.className} antialiased relative`}
        suppressHydrationWarning
      >
        <NetworkStatusNotifier />
        <Toaster position="bottom-right" reverseOrder={false} />
        <ProviderQueryClient>
          <AuthProvider>{children}</AuthProvider>
        </ProviderQueryClient>
      </body>
    </html>
  )
}
