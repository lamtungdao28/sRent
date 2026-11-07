import { api } from './client'
import type { Property } from '@/types/api'

export type PropertyInput = Omit<Property, 'id'>
export const propertiesApi = {
  mine: async () => (await api.get<Property[]>('/properties/my')).data,
  create: async (body: PropertyInput) => (await api.post<Property>('/properties', body)).data,
}
