import { api } from './client'
import type { AdminDashboard, AdminUser, AdminVideoQueueItem, Page, Payment, Room, UserRole, UserStatus } from '@/types/api'

export const adminApi = {
  dashboard: async () => (await api.get<AdminDashboard>('/admin/dashboard')).data,
  users: async (role?: UserRole) => (await api.get<Page<AdminUser>>('/admin/users', { params: role ? { role } : {} })).data,
  setUserStatus: async (id: string, status: UserStatus) => (await api.patch<AdminUser>(`/admin/users/${id}/status`, { status })).data,
  transactions: async () => (await api.get<Page<Payment>>('/admin/transactions')).data,
  roomQueue: async () => (await api.get<Page<Room>>('/admin/rooms')).data,
  videoQueue: async () => (await api.get<Page<AdminVideoQueueItem>>('/admin/videos')).data,
  releasePayment: async (id: string) => (await api.post<Payment>(`/payments/${id}/release`)).data,
  reviewRoom: async (id: string, decision: 'APPROVE' | 'REJECT', note?: string) => (await api.patch(`/admin/rooms/${id}/review`, { decision, note })).data,
  reviewVideo: async (id: string, decision: 'APPROVE' | 'REJECT', note?: string) => (await api.patch(`/admin/videos/${id}/review`, { decision, note })).data,
}
