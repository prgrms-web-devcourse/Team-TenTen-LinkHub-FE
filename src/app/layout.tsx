import { Providers } from '@/components'
import Header from '@/components/common/Header/Header'
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
      <body className="bg-bgColor">
        <Providers>
          <div
            id="root"
            className="relative mx-auto w-full max-w-[500px]">
            <Header />
            <main className="pt-[53px]">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
