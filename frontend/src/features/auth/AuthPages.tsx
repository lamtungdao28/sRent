import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { House, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { authApi } from '@/api/auth.api'
import { errorMessage } from '@/api/client'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Field, Input, Select } from '@/components/ui/Form'
import { useAuth } from '@/providers/AuthProvider'
import { destinationAfterAuth, roleHome } from '@/lib/auth-navigation'

const loginSchema = z.object({ email: z.email('Email chưa hợp lệ'), password: z.string().min(1, 'Vui lòng nhập mật khẩu') })
const registerSchema = z.object({ fullName: z.string().min(2, 'Họ tên cần ít nhất 2 ký tự'), email: z.email('Email chưa hợp lệ'), password: z.string().min(8, 'Mật khẩu cần ít nhất 8 ký tự').max(72), role: z.enum(['STUDENT','LANDLORD']) })
type LoginValues = z.infer<typeof loginSchema>; type RegisterValues = z.infer<typeof registerSchema>

function AuthFrame({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <main className="grid min-h-screen bg-slate-50 lg:grid-cols-2"><section className="relative hidden overflow-hidden bg-brand-800 p-12 text-white lg:flex lg:flex-col lg:justify-between"><div className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl"/><Link to="/" className="relative flex items-center gap-3 text-xl font-bold"><span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15"><House/></span>S-Rent</Link><div className="relative max-w-lg"><span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm"><ShieldCheck className="h-4 w-4"/> Nền tảng thuê trọ cho sinh viên</span><h2 className="text-balance text-4xl font-extrabold leading-tight">Tìm đúng phòng. Kết nối đúng người. Thuê trọ an tâm hơn.</h2><p className="mt-5 text-lg leading-8 text-brand-100">Phòng trọ, trò chuyện, booking và hồ sơ thuê được quản lý trong một hành trình rõ ràng.</p></div><p className="relative text-sm text-brand-200">AI chỉ hỗ trợ rà soát; mọi quyết định xác minh cần Admin phê duyệt.</p></section><section className="flex items-center justify-center p-4 sm:p-8"><div className="w-full max-w-md"><Link to="/" className="mb-8 flex items-center gap-2 text-lg font-bold text-brand-800 lg:hidden"><House/>S-Rent</Link><h1 className="text-3xl font-bold tracking-tight">{title}</h1><p className="mt-2 text-sm text-slate-500">{description}</p><Card className="mt-7">{children}</Card></div></section></main>
}

export function LoginPage() {
  const { user, authenticate } = useAuth(); const navigate = useNavigate(); const location = useLocation()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '' } })
  if (user) return <Navigate to={roleHome(user.role)} replace/>
  const submit = async (values: LoginValues) => { try { const data = await authApi.login(values); await authenticate(data); toast.success('Đăng nhập thành công'); const from=(location.state as {from?:string}|null)?.from; navigate(destinationAfterAuth(data.role,from),{replace:true}) } catch(e){ toast.error(errorMessage(e)) } }
  return <AuthFrame title="Chào mừng trở lại" description="Đăng nhập để tiếp tục hành trình thuê trọ của bạn."><form className="space-y-4" onSubmit={handleSubmit(submit)}><Field label="Email" error={errors.email?.message}><div className="relative"><Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400"/><Input className="pl-10" type="email" autoComplete="email" placeholder="ban@example.com" {...register('email')}/></div></Field><Field label="Mật khẩu" error={errors.password?.message}><div className="relative"><LockKeyhole className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400"/><Input className="pl-10" type="password" autoComplete="current-password" {...register('password')}/></div></Field><Button className="w-full" loading={isSubmitting}>Đăng nhập</Button></form><div className="mt-5 rounded-xl bg-sky-50 p-3 text-xs leading-5 text-sky-900"><strong>Tài khoản development:</strong><br/>student@srent.local / Student@123<br/>landlord@srent.local / Landlord@123</div><p className="mt-5 text-center text-sm text-slate-600">Chưa có tài khoản? <Link className="font-semibold text-brand-700 hover:underline" to="/dang-ky">Đăng ký</Link></p></AuthFrame>
}

export function RegisterPage() {
  const { user, authenticate }=useAuth(); const navigate=useNavigate(); const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<RegisterValues>({resolver:zodResolver(registerSchema),defaultValues:{fullName:'',email:'',password:'',role:'STUDENT'}})
  if(user)return<Navigate to={roleHome(user.role)} replace/>
  const submit=async(values:RegisterValues)=>{try{const data=await authApi.register(values);await authenticate(data);toast.success('Tạo tài khoản thành công');navigate(data.role==='LANDLORD'?'/chu-tro':'/')}catch(e){toast.error(errorMessage(e))}}
  return <AuthFrame title="Tạo tài khoản S-Rent" description="Chọn đúng vai trò để chúng tôi chuẩn bị trải nghiệm phù hợp."><form className="space-y-4" onSubmit={handleSubmit(submit)}><Field label="Họ và tên" error={errors.fullName?.message}><Input autoComplete="name" {...register('fullName')}/></Field><Field label="Email" error={errors.email?.message}><Input type="email" autoComplete="email" {...register('email')}/></Field><Field label="Mật khẩu" hint="Tối thiểu 8 ký tự" error={errors.password?.message}><Input type="password" autoComplete="new-password" {...register('password')}/></Field><Field label="Bạn sử dụng S-Rent với vai trò" error={errors.role?.message}><Select {...register('role')}><option value="STUDENT">Sinh viên tìm phòng</option><option value="LANDLORD">Chủ trọ đăng phòng</option></Select></Field><Button className="w-full" loading={isSubmitting}>Tạo tài khoản</Button></form><p className="mt-5 text-center text-sm">Đã có tài khoản? <Link className="font-semibold text-brand-700" to="/dang-nhap">Đăng nhập</Link></p></AuthFrame>
}
