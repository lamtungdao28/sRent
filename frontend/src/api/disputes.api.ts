import { api } from './client'
import type { Dispute, DisputeStatus, Page } from '@/types/api'

export const disputesApi = {
  list: async () => (await api.get<Page<Dispute>>('/disputes')).data,
  create: async (body: { bookingId: string; subject: string; description: string }) => (await api.post<Dispute>('/disputes', body)).data,
  respond: async (id: string, content: string) => (await api.patch<Dispute>(`/disputes/${id}/respond`, { content })).data,
  adminList: async () => (await api.get<Page<Dispute>>('/admin/disputes')).data,
  adminReview: async (id: string, status: DisputeStatus, note?: string) => (await api.patch<Dispute>(`/admin/disputes/${id}/review`, { status, note })).data,
}
