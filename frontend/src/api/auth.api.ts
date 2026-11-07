import { api } from './client'
import type { AuthResponse, UserRole } from '@/types/api'

export const authApi = {
  login: async (body: { email: string; password: string }) => (await api.post<AuthResponse>('/auth/login', body)).data,
  register: async (body: { email: string; password: string; fullName: string; role: Exclude<UserRole, 'ADMIN'> }) => (await api.post<AuthResponse>('/auth/register', body)).data,
}

export interface ZaloLoginAdapter { login(accessToken: string): Promise<AuthResponse> }
export const zaloLoginAdapter: ZaloLoginAdapter = { login: async () => { throw new Error('Đăng nhập Zalo chưa được Backend cấu hình.') } }
