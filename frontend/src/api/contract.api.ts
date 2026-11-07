import { api, uploadToPresignedUrl } from './client'
import type { AdminContractReview, Contract, ContractAnalysis, UploadGrant } from '@/types/api'

// Contract khớp ContractController hiện tại. Component chỉ phụ thuộc adapter này để thay provider sau này.
export const contractApi = {
  create: async (body: { bookingId: string; title: string }) => (await api.post<Contract>('/contracts', body)).data,
  one: async (id: string) => (await api.get<Contract>(`/contracts/${id}`)).data,
  requestUpload: async (id: string) => (await api.post<UploadGrant>(`/contracts/${id}/upload`, { contentType: 'application/pdf' })).data,
  uploadFile: uploadToPresignedUrl,
  analyze: async (id: string) => (await api.post<ContractAnalysis>(`/contracts/${id}/analyze`)).data,
  analysis: async (id: string) => (await api.get<ContractAnalysis>(`/contracts/${id}/analysis`)).data,
  adminList: async () => (await api.get<AdminContractReview[]>('/admin/contracts')).data,
  adminReview: async (id: string, decision: 'APPROVE' | 'REJECT', note?: string) => (await api.patch<AdminContractReview>(`/admin/contracts/${id}/review`, { decision, note })).data,
}
