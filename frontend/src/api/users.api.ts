import { api } from './client'
import type { User } from '@/types/api'

export type UpdateProfile = Pick<User, 'fullName'> & Partial<Pick<User, 'phone' | 'dateOfBirth' | 'studentId' | 'hometown'>>
export const usersApi = {
  me: async () => (await api.get<User>('/users/me')).data,
  update: async (body: UpdateProfile) => (await api.put<User>('/users/me', body)).data,
}
