import { NavLink, Outlet, Link } from 'react-router-dom'
import { Bell, Building2, CalendarCheck2, FileSearch, Home, House, LayoutDashboard, LogOut, Menu, MessageCircle, Search, ShieldCheck, UserRound, UsersRound, Video, WalletCards, Scale, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { cn } from '@/lib/utils'
import { roleHome } from '@/lib/auth-navigation'

const studentNav = [
  { to: '/', label: 'Trang chủ', icon: Home }, { to: '/tim-phong', label: 'Tìm phòng', icon: Search },
  { to: '/tin-nhan', label: 'Tin nhắn', icon: MessageCircle }, { to: '/tai-khoan', label: 'Cá nhân', icon: UserRound },
]
const landlordNav = [
  { to: '/chu-tro', label: 'Tổng quan', icon: LayoutDashboard }, { to: '/chu-tro/phong', label: 'Phòng của tôi', icon: House },
  { to: '/chu-tro/yeu-cau-thue', label: 'Yêu cầu thuê', icon: CalendarCheck2 }, { to: '/tai-khoan', label: 'Cá nhân', icon: UserRound },
]
const adminNav = [
  { to: '/admin', label: 'Tổng quan', icon: LayoutDashboard }, { to: '/admin/nguoi-dung', label: 'Người dùng', icon: UsersRound },
  { to: '/admin/phong', label: 'Duyệt phòng', icon: Building2 }, { to: '/admin/video', label: 'Duyệt video', icon: Video },
  { to: '/admin/ekyc', label: 'Duyệt eKYC', icon: ShieldCheck }, { to: '/admin/hop-dong', label: 'AI hợp đồng', icon: FileSearch },
  { to: '/admin/tranh-chap', label: 'Tranh chấp', icon: Scale }, { to: '/admin/giao-dich', label: 'Giao dịch', icon: WalletCards },
]

function Logo() { const { role }=useAuth(); return <Link to={roleHome(role)} className="flex items-center gap-2.5 rounded-lg"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-700 text-white"><House className="h-5 w-5"/></span><span><strong className="block text-lg leading-5 text-slate-950">S-Rent</strong><small className="text-xs text-slate-500">Thuê trọ an tâm</small></span></Link> }

export function AppShell() {
  const { role, user, logout } = useAuth()
  const nav = role === 'LANDLORD' ? landlordNav : studentNav
  return <div className="min-h-screen pb-24 lg:pb-0">
    <a href="#main-content" className="sr-only z-50 rounded-lg bg-white p-3 focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Bỏ qua đến nội dung chính</a>
    <header className="safe-top sticky top-0 z-30 border-b bg-white/95 backdrop-blur"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"><Logo/><div className="flex items-center gap-2"><button aria-label="Thông báo" className="grid h-11 w-11 place-items-center rounded-xl text-slate-500 hover:bg-slate-100"><Bell className="h-5 w-5"/></button><div className="hidden text-right sm:block"><p className="text-sm font-semibold">{user?.fullName}</p><p className="text-xs text-slate-500">{role === 'LANDLORD' ? 'Chủ trọ' : 'Sinh viên'}</p></div><button aria-label="Đăng xuất" onClick={logout} className="grid h-11 w-11 place-items-center rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600"><LogOut className="h-5 w-5"/></button></div></div></header>
    <main id="main-content" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8"><Outlet/></main>
    <nav aria-label="Điều hướng chính" className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t bg-white lg:hidden"><div className="grid grid-cols-4">{nav.map(({to,label,icon:Icon}) => <NavLink key={to} to={to} end={to==='/' || to==='/chu-tro'} className={({isActive})=>cn('flex min-h-14 flex-col items-center justify-center gap-1 px-1 pt-2 text-[11px] font-medium', isActive?'text-brand-700':'text-slate-500')}><Icon className="h-5 w-5"/><span>{label}</span></NavLink>)}</div></nav>
    <nav className="fixed left-1/2 top-3 z-40 hidden -translate-x-1/2 items-center gap-1 rounded-2xl border bg-white/95 p-1 shadow-soft lg:flex" aria-label="Điều hướng desktop">{nav.map(({to,label,icon:Icon}) => <NavLink key={to} to={to} end={to==='/' || to==='/chu-tro'} className={({isActive})=>cn('flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium', isActive?'bg-brand-50 text-brand-800':'text-slate-600 hover:bg-slate-50')}><Icon className="h-4 w-4"/>{label}</NavLink>)}</nav>
  </div>
}

export function AdminShell() {
  const [open, setOpen] = useState(false); const { user, logout } = useAuth()
  return <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[260px_1fr]">
    <a href="#admin-main-content" className="sr-only z-50 rounded-lg bg-white p-3 focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Bỏ qua đến nội dung chính</a>
    <header className="safe-top sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 lg:hidden"><Logo/><button className="grid h-11 w-11 place-items-center rounded-xl border" onClick={()=>setOpen(!open)} aria-label="Mở menu">{open?<X/>:<Menu/>}</button></header>
    <aside className={cn('fixed inset-y-0 left-0 z-40 w-[280px] border-r bg-white p-5 transition-transform lg:sticky lg:top-0 lg:block lg:h-screen lg:w-auto lg:translate-x-0', open?'translate-x-0':'-translate-x-full')}>
      <Logo/><div className="mt-8 rounded-xl bg-slate-50 p-3"><p className="text-sm font-semibold">{user?.fullName}</p><p className="text-xs text-slate-500">Quản trị viên</p></div>
      <nav className="mt-5 space-y-1">{adminNav.map(({to,label,icon:Icon})=><NavLink key={to} to={to} end={to==='/admin'} onClick={()=>setOpen(false)} className={({isActive})=>cn('flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium',isActive?'bg-brand-50 text-brand-800':'text-slate-600 hover:bg-slate-50')}><Icon className="h-5 w-5"/>{label}</NavLink>)}</nav>
      <button onClick={logout} className="mt-6 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-red-600 hover:bg-red-50"><LogOut className="h-5 w-5"/>Đăng xuất</button>
    </aside>{open&&<button className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" onClick={()=>setOpen(false)} aria-label="Đóng menu"/>}
    <main id="admin-main-content" className="min-w-0 p-4 sm:p-6 lg:p-8"><Outlet/></main>
  </div>
}
