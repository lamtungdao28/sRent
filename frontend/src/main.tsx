import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import App from './App'
import { AuthProvider } from '@/providers/AuthProvider'
import './index.css'

const queryClient=new QueryClient({defaultOptions:{queries:{staleTime:30_000,retry:(count,error)=>{const status=(error as {response?:{status?:number}})?.response?.status;return status===401||status===403||status===404?false:count<1}}}})

createRoot(document.getElementById('root')!).render(<StrictMode><QueryClientProvider client={queryClient}><AuthProvider><App/><Toaster position="top-right" richColors closeButton/></AuthProvider></QueryClientProvider></StrictMode>)
