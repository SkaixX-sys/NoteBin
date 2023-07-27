import { useUserStore } from '@/store/user-store'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const checkAuth = useUserStore((item) => item.checkAuth)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth()
    }
  }, [])
 
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}
