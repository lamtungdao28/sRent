import { ArrowLeft, Home, LockKeyhole, SearchX } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/providers/AuthProvider'
import { roleHome } from '@/lib/auth-navigation'

function SystemPage({ code, title, description, icon: Icon }: { code: string; title: string; description: string; icon: typeof SearchX }) { const navigate=useNavigate(); const { role }=useAuth(); return <main className="grid min-h-screen place-items-center bg-slate-50 p-6"><div className="max-w-md text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-brand-100 text-brand-800"><Icon className="h-9 w-9"/></div><p className="mt-6 text-sm font-bold tracking-[.25em] text-brand-700">{code}</p><h1 className="mt-2 text-3xl font-extrabold">{title}</h1><p className="mt-3 leading-7 text-slate-500">{description}</p><div className="mt-7 flex justify-center gap-3"><Button variant="outline" onClick={()=>navigate(-1)}><ArrowLeft className="h-4 w-4"/>Quay lại</Button><Link to={roleHome(role)}><Button><Home className="h-4 w-4"/>Trang chủ</Button></Link></div></div></main> }
export const ForbiddenPage=()=> <SystemPage code="403" title="Bạn không có quyền truy cập" description="Tài khoản hiện tại không được phép mở khu vực này. Backend vẫn là nơi xác minh quyền cuối cùng." icon={LockKeyhole}/>
export const NotFoundPage=()=> <SystemPage code="404" title="Không tìm thấy trang" description="Đường dẫn có thể đã thay đổi hoặc nội dung không còn tồn tại." icon={SearchX}/>
export const UnauthorizedPage=()=> <SystemPage code="401" title="Cần đăng nhập" description="Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại." icon={LockKeyhole}/>
