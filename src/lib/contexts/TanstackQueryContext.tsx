'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface TanstackQueryContextProps {
  children: React.ReactNode
}

export default function TanstackQueryContext({
  children,
}: TanstackQueryContextProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
