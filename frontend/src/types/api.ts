export type UserRole = 'STUDENT' | 'LANDLORD' | 'ADMIN'
export type UserStatus = 'ACTIVE' | 'LOCKED'
export type RoomStatus = 'AVAILABLE' | 'RESERVED' | 'RENTED' | 'HIDDEN'
export type ApprovalStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED'
export type BookingStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED'
export type PaymentStatus = 'PENDING' | 'HELD' | 'RELEASED' | 'REFUNDED' | 'FAILED'
export type VerificationStatus = 'SUBMITTED' | 'AI_PROCESSED' | 'NEEDS_REVIEW' | 'APPROVED' | 'REJECTED'
export type ContractStatus = 'DRAFT' | 'UPLOADED' | 'ANALYZED' | 'PUBLISHED' | 'REJECTED'
export type ReviewStatus = 'PENDING' | 'PUBLISHED' | 'REJECTED'
export type DisputeStatus = 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED'
export type VideoStatus = 'UPLOADING' | 'PENDING' | 'APPROVED' | 'REJECTED'

export interface Page<T> { content: T[]; totalElements: number; totalPages: number; number: number; size: number; first: boolean; last: boolean }
export interface ApiError { code: string; message: string; timestamp?: string; path?: string; fieldErrors?: Record<string, string> }
export interface AuthResponse { accessToken: string; tokenType: 'Bearer'; userId: string; email: string; role: UserRole }
export interface User { id: string; email: string; fullName: string; phone?: string; dateOfBirth?: string; studentId?: string; hometown?: string; role: UserRole; status: UserStatus; createdAt: string }
export interface Room { id: string; propertyId: string; propertyName: string; address: string; district: string; city: string; latitude: number; longitude: number; title: string; description?: string; monthlyPrice: number; areaSqm: number; amenities: string[]; maxOccupants: number; status: RoomStatus; approvalStatus: ApprovalStatus; rejectionReason?: string }
export interface Property { id: string; name: string; description?: string; addressLine: string; ward?: string; district: string; city: string; latitude: number; longitude: number }
export interface RoomImage { id: string; url: string; sortOrder: number }
export interface RoomVideo { id: string; status: VideoStatus; url?: string; sizeBytes?: number; distanceMeters: number; reviewNote?: string; gpsOnlyLocationCheck: boolean }
export interface UploadGrant { objectKey: string; url: string; expiresAt: string }
export interface VideoUploadGrant { mediaId: string; objectKey: string; uploadUrl: string; expiresAt: string; distanceMeters: number; warning: string; uploadToken?: string }
export interface AdminVideoQueueItem { id: string; roomId: string; roomTitle: string; status: VideoStatus; videoUrl: string; sizeBytes?: number; distanceMeters: number; gpsAccuracyMeters: number; capturedAt: string }
export interface Conversation { id: string; roomId: string; roomTitle: string; studentId: string; landlordId: string; updatedAt: string; maskingNotice: string }
export interface Message { id: string; senderId: string; content: string; masked: boolean; createdAt: string }
export interface Booking { id: string; roomId: string; roomTitle: string; studentId: string; landlordId: string; moveInDate: string; note?: string; status: BookingStatus; createdAt: string }
export interface Payment { id: string; bookingId: string; amount: number; currency: 'VND'; status: PaymentStatus; provider: string; providerReference: string; simulated: boolean; notice: string; createdAt: string }
export interface VerificationDocumentInput { documentType: string; objectKey: string; contentType: string }
export interface Verification { id: string; legalName: string; identityNumberMasked: string; address: string; status: VerificationStatus; provider: string; simulated: boolean; extractedData?: string; anomalyReasons?: string; adminNote?: string; documentTypes: string[] }
export interface Contract { id: string; bookingId: string; title: string; status: ContractStatus; downloadUrl?: string }
export interface ContractRisk { category: string; severity: string; explanation: string; excerpt: string; suggestedQuestion: string }
export interface ContractAnalysis { id: string; provider: string; simulated: boolean; disclaimer: string; reviewStatus: ReviewStatus; adminNote?: string; risks: ContractRisk[] }
export interface Ct01 { id: string; bookingId: string; fullName: string; dateOfBirth: string; identityNumberMasked: string; phone?: string; currentAddress: string; requestedAddress: string; requestContent: string; additionalData?: string; createdAt: string; disclaimer: string }
export interface Dispute { id: string; bookingId: string; subject: string; description: string; landlordResponse?: string; status: DisputeStatus; adminNote?: string; createdAt: string }
export interface AdminDashboard { users: number; students: number; landlords: number; rooms: number; bookings: number; pendingVerifications: number; pendingVideos: number; pendingContractAnalyses: number; openDisputes: number }
export interface AdminUser { id: string; email: string; fullName: string; role: UserRole; status: UserStatus; createdAt: string }
export interface AdminVerification extends Omit<Verification, 'address' | 'extractedData' | 'documentTypes'> { landlordId: string; documents: { type: string; downloadUrl: string }[] }
export interface AdminContractReview { contractId: string; reviewStatus: ReviewStatus; provider: string; simulated: boolean; disclaimer: string; adminNote?: string }
