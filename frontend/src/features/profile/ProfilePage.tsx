import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { CalendarDays, CreditCard, FileText, LogOut, MessageCircle, MessageSquareWarning, ShieldCheck, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usersApi, type UpdateProfile } from '@/api/users.api'
import { errorMessage } from '@/api/client'
import { PageHeader } from '@/components/common/PageHeader'
import { StatusBadge } from '@/components/common/StatusBadge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Field, Input } from '@/components/ui/Form'
import { useAuth } from '@/providers/AuthProvider'

export function ProfilePage() {
  const { user, logout, refresh }=useAuth(); const {register,handleSubmit,formState:{isSubmitting}}=useForm<UpdateProfile>({values:{fullName:user?.fullName||'',phone:user?.phone||'',dateOfBirth:user?.dateOfBirth||'',studentId:user?.studentId||'',hometown:user?.hometown||''}})
  const mutation=useMutation({mutationFn:usersApi.update,onSuccess:async()=>{await refresh();toast.success('Đã cập nhật hồ sơ')},onError:(e)=>toast.error(errorMessage(e))})
  if(!user)return null
  const links=user.role==='LANDLORD'?[{to:'/chu-tro/xac-minh',label:'Xác minh chủ trọ',icon:ShieldCheck},{to:'/chu-tro/khu-tro',label:'Khu trọ của tôi',icon:FileText},{to:'/chu-tro/tin-nhan',label:'Tin nhắn sinh viên',icon:MessageCircle},{to:'/chu-tro/tranh-chap',label:'Tranh chấp liên quan',icon:MessageSquareWarning}]:[{to:'/bookings',label:'Yêu cầu thuê',icon:CalendarDays},{to:'/thanh-toan',label:'Thanh toán mô phỏng',icon:CreditCard},{to:'/ct01',label:'Tờ khai CT01',icon:FileText},{to:'/tranh-chap',label:'Khiếu nại',icon:MessageSquareWarning}]
  return <><PageHeader title="Hồ sơ cá nhân" description="Thông tin này được lấy trực tiếp từ tài khoản Backend."/><div className="grid gap-5 lg:grid-cols-[320px_1fr]"><div className="space-y-4"><Card><div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-100 text-brand-800"><UserRound className="h-8 w-8"/></div><h2 className="mt-4 text-lg font-bold">{user.fullName}</h2><p className="text-sm text-slate-500">{user.email}</p><div className="mt-3 flex gap-2"><StatusBadge status={user.status}/><StatusBadge status={user.role} label={user.role==='STUDENT'?'Sinh viên':user.role==='LANDLORD'?'Chủ trọ':'Admin'}/></div></Card><Card className="p-2">{links.map(({to,label,icon:Icon})=><Link className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium hover:bg-slate-50" to={to} key={to}><Icon className="h-5 w-5 text-brand-700"/>{label}</Link>)}</Card><Button variant="outline" className="w-full text-red-600" onClick={logout}><LogOut className="h-4 w-4"/>Đăng xuất</Button></div><Card><h2 className="mb-5 text-lg font-bold">Chỉnh sửa thông tin</h2><form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(v=>mutation.mutate(v))}><Field label="Họ và tên"><Input required {...register('fullName')}/></Field><Field label="Số điện thoại"><Input {...register('phone')}/></Field><Field label="Ngày sinh"><Input type="date" {...register('dateOfBirth')}/></Field><Field label="Mã sinh viên"><Input disabled={user.role!=='STUDENT'} {...register('studentId')}/></Field><div className="sm:col-span-2"><Field label="Quê quán"><Input {...register('hometown')}/></Field></div><Button className="sm:col-span-2 sm:w-fit" loading={isSubmitting||mutation.isPending}>Lưu thay đổi</Button></form></Card></div></>
}
