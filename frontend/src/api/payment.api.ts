import { api } from './client'
import type { Page, Payment } from '@/types/api'

export const paymentApi = {
  mine: async () => (await api.get<Page<Payment>>('/payments/my')).data,
  create: async (body: { bookingId: string; amount: number }) => (await api.post<Payment>('/payments', body)).data,
  confirm: async (id: string) => (await api.post<Payment>(`/payments/${id}/confirm`)).data,
  refund: async (id: string) => (await api.post<Payment>(`/payments/${id}/refund`)).data,
  release: async (id: string) => (await api.post<Payment>(`/payments/${id}/release`)).data,
}
