import { Providers } from '@/components'
import Header from '@/components/common/Header/Header'
import ToastContainer from '@/components/common/Toast/ToastContainer'
import { AuthProvider } from '@/lib/contexts/AuthProvider'
import TanstackQueryContext from '@/lib/contexts/TanstackQueryContext'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <TanstackQueryContext>
        <AuthProvider>
          <body className="bg-bgColor">
            <Providers>
              <div
                id="root"
                className="relative	mx-auto min-h-screen w-full max-w-[500px] shadow-xl">
                <Header />
                <main className="pt-[53px]">{children}</main>
              </div>
            </Providers>
            <ToastContainer />
          </body>
        </AuthProvider>
      </TanstackQueryContext>
    </html>
  )
}
