import { api, uploadToPresignedUrl } from './client'
import type { AdminVerification, Page, UploadGrant, Verification, VerificationDocumentInput } from '@/types/api'

// Contract khớp EkycController hiện tại. Đối chiếu lại khi provider eKYC production thay đổi DTO.
export const ekycApi = {
  mine: async () => (await api.get<Verification>('/landlords/verification/me')).data,
  requestUpload: async (body: { documentType: string; contentType: string }) => (await api.post<UploadGrant>('/landlords/verification/upload-request', body)).data,
  submit: async (body: { legalName: string; identityNumber: string; address: string; documents: VerificationDocumentInput[] }) => (await api.post<Verification>('/landlords/verification', body)).data,
  uploadFile: uploadToPresignedUrl,
  adminList: async () => (await api.get<Page<AdminVerification>>('/admin/verifications')).data,
  adminReview: async (id: string, decision: 'APPROVE' | 'REJECT', note?: string) => (await api.patch<AdminVerification>(`/admin/verifications/${id}/review`, { decision, note })).data,
}

export const isAiDevMockEnabled = import.meta.env.DEV && import.meta.env.VITE_ENABLE_AI_DEV_MOCKS === 'true'
