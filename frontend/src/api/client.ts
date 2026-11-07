import axios, { AxiosError } from 'axios'
import type { ApiError } from '@/types/api'

export const TOKEN_KEY = 'srent_access_token'
export const AUTH_EVENT = 'srent:unauthorized'

export const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1', timeout: 20_000 })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use((response) => response, (error: AxiosError<ApiError>) => {
  if (error.response?.status === 401) {
    localStorage.removeItem(TOKEN_KEY)
    window.dispatchEvent(new Event(AUTH_EVENT))
  }
  return Promise.reject(error)
})

export const errorMessage = (error: unknown) => {
  if (axios.isAxiosError<ApiError>(error)) {
    if (!error.response) return 'Không thể kết nối Backend. Hãy kiểm tra dịch vụ tại cổng 3001.'
    return error.response.data?.message || 'Yêu cầu không thể thực hiện.'
  }
  return error instanceof Error ? error.message : 'Đã có lỗi xảy ra.'
}

export const uploadToPresignedUrl = (url: string, file: File, onProgress?: (percent: number) => void) =>
  axios.put(url, file, { headers: { 'Content-Type': file.type }, onUploadProgress: (e) => onProgress?.(e.total ? Math.round((e.loaded / e.total) * 100) : 0) })
