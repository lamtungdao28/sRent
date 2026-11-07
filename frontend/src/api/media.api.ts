import { api, uploadToPresignedUrl } from './client'
import type { RoomImage, RoomVideo, UploadGrant, VideoUploadGrant } from '@/types/api'

export const mediaApi = {
  images: async (roomId: string) => (await api.get<RoomImage[]>(`/rooms/${roomId}/images`)).data,
  video: async (roomId: string) => (await api.get<RoomVideo>(`/rooms/${roomId}/video`)).data,
  requestImage: async (roomId: string, body: { contentType: string; sortOrder: number }) => (await api.post<UploadGrant>(`/rooms/${roomId}/images/upload-request`, body)).data,
  completeImage: async (roomId: string, body: { objectKey: string; contentType: string; sortOrder: number }) => (await api.post<RoomImage>(`/rooms/${roomId}/images/complete`, body)).data,
  requestVideo: async (roomId: string, body: { latitude: number; longitude: number; accuracyMeters: number; capturedAt: string; contentType: string }) => (await api.post<VideoUploadGrant>(`/rooms/${roomId}/video/upload-request`, body)).data,
  completeVideo: async (roomId: string, uploadToken: string) => (await api.post<RoomVideo>(`/rooms/${roomId}/video/complete`, { uploadToken })).data,
  uploadFile: uploadToPresignedUrl,
}
