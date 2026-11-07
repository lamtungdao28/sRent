import { api } from './client'
import type { Ct01, Page } from '@/types/api'

export interface Ct01Input { bookingId: string; identityNumber: string; currentAddress: string; requestContent: string; additionalData?: string; dateOfBirth?: string }
export const ct01Api = {
  mine: async () => (await api.get<Page<Ct01>>('/ct01/my')).data,
  one: async (id: string) => (await api.get<Ct01>(`/ct01/${id}`)).data,
  create: async (body: Ct01Input) => (await api.post<Ct01>('/ct01', body)).data,
  update: async (id: string, body: Ct01Input) => (await api.put<Ct01>(`/ct01/${id}`, body)).data,
  pdf: async (id: string) => (await api.get<Blob>(`/ct01/${id}/pdf`, { responseType: 'blob' })).data,
}
