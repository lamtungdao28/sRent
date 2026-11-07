import { api } from './client'
import type { Booking, Page } from '@/types/api'

export const bookingApi = {
  create: async (body: { roomId: string; moveInDate: string; note?: string }) => (await api.post<Booking>('/bookings', body)).data,
  mine: async () => (await api.get<Page<Booking>>('/bookings/my')).data,
  landlord: async () => (await api.get<Page<Booking>>('/bookings/landlord')).data,
  cancel: async (id: string) => (await api.patch<Booking>(`/bookings/${id}/cancel`)).data,
  accept: async (id: string) => (await api.patch<Booking>(`/bookings/${id}/accept`)).data,
  reject: async (id: string) => (await api.patch<Booking>(`/bookings/${id}/reject`)).data,
}
