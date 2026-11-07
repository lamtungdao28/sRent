import { api } from './client'
import type { Conversation, Message, Page } from '@/types/api'

export const chatApi = {
  list: async () => (await api.get<Conversation[]>('/conversations')).data,
  create: async (roomId: string) => (await api.post<Conversation>('/conversations', { roomId })).data,
  messages: async (id: string) => (await api.get<Page<Message>>(`/conversations/${id}/messages`, { params: { size: 100 } })).data,
  send: async (id: string, content: string) => (await api.post<Message>(`/conversations/${id}/messages`, { content })).data,
  markRead: async (id: string) => { await api.patch(`/conversations/${id}/read`) },
}
