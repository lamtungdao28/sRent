import { cn } from '@/lib/utils'

const labels: Record<string, string> = {
  DRAFT: 'Chưa gửi', SUBMITTED: 'Đã gửi', UPLOADING: 'Đang tải lên', AI_PROCESSED: 'AI đã xử lý', ANALYZED: 'Đang xử lý',
  PENDING: 'Chờ duyệt', NEEDS_REVIEW: 'Chờ Admin duyệt', APPROVED: 'Đã duyệt', PUBLISHED: 'Đã duyệt', REJECTED: 'Bị từ chối',
  AVAILABLE: 'Còn trống', RESERVED: 'Đã giữ chỗ', RENTED: 'Đã thuê', HIDDEN: 'Đang ẩn', ACCEPTED: 'Đã chấp nhận',
  CANCELLED: 'Đã hủy', COMPLETED: 'Hoàn tất', HELD: 'Đang giữ (mô phỏng)', RELEASED: 'Đã giải ngân (mô phỏng)', REFUNDED: 'Đã hoàn (mô phỏng)', FAILED: 'Thất bại',
  OPEN: 'Mới tạo', IN_REVIEW: 'Đang xử lý', RESOLVED: 'Đã giải quyết', ACTIVE: 'Hoạt động', LOCKED: 'Đã khóa',
}
const tone = (status: string) => {
  if (['APPROVED','PUBLISHED','AVAILABLE','ACCEPTED','COMPLETED','RESOLVED','ACTIVE'].includes(status)) return 'bg-emerald-100 text-emerald-800'
  if (['REJECTED','FAILED','LOCKED'].includes(status)) return 'bg-red-100 text-red-800'
  if (['PENDING','NEEDS_REVIEW','SUBMITTED','ANALYZED','UPLOADING','IN_REVIEW','HELD'].includes(status)) return 'bg-amber-100 text-amber-800'
  return 'bg-slate-100 text-slate-700'
}
export function StatusBadge({ status, label }: { status: string; label?: string }) { return <span className={cn('inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap', tone(status))}>{label || labels[status] || status}</span> }
