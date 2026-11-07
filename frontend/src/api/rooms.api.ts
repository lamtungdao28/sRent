import { api } from './client'
import type { Page, Room, RoomStatus } from '@/types/api'

export interface RoomFilters { city?: string; district?: string; minPrice?: number; maxPrice?: number; minArea?: number; amenity?: string; page?: number; size?: number; sort?: string }
export interface RoomInput { propertyId: string; title: string; description?: string; monthlyPrice: number; areaSqm: number; amenities: string[]; maxOccupants: number; status?: RoomStatus }
export const roomsApi = {
  search: async (params: RoomFilters = {}) => (await api.get<Page<Room>>('/rooms', { params })).data,
  one: async (id: string) => (await api.get<Room>(`/rooms/${id}`)).data,
  mine: async (params: { page?: number; size?: number } = {}) => (await api.get<Page<Room>>('/rooms/my', { params })).data,
  create: async (body: RoomInput) => (await api.post<Room>('/rooms', body)).data,
  update: async (id: string, body: RoomInput) => (await api.put<Room>(`/rooms/${id}`, body)).data,
  submit: async (id: string) => (await api.post<Room>(`/rooms/${id}/submit`)).data,
}
