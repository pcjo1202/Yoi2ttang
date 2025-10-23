"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

interface QueryProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient()

queryClient.setDefaultOptions({
  queries: {
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  },
})

const QueryProvider = (data: QueryProviderProps) => {
  const { children } = data

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider
