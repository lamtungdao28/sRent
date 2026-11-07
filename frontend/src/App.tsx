import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoadingState } from '@/components/common/States'
import { AppShell, AdminShell } from '@/components/layout/AppShell'
import { ProtectedRoute, RoleGuard } from '@/routes/Guards'

const LoginPage=lazy(()=>import('@/features/auth/AuthPages').then(m=>({default:m.LoginPage})))
const RegisterPage=lazy(()=>import('@/features/auth/AuthPages').then(m=>({default:m.RegisterPage})))
const ProfilePage=lazy(()=>import('@/features/profile/ProfilePage').then(m=>({default:m.ProfilePage})))
const HomePage=lazy(()=>import('@/features/student/RoomPages').then(m=>({default:m.HomePage})))
const SearchPage=lazy(()=>import('@/features/student/RoomPages').then(m=>({default:m.SearchPage})))
const RoomDetailPage=lazy(()=>import('@/features/student/RoomPages').then(m=>({default:m.RoomDetailPage})))
const BookingPage=lazy(()=>import('@/features/student/RoomPages').then(m=>({default:m.BookingPage})))
const ConversationListPage=lazy(()=>import('@/features/chat/ChatPages').then(m=>({default:m.ConversationListPage})))
const ChatPage=lazy(()=>import('@/features/chat/ChatPages').then(m=>({default:m.ChatPage})))
const MyBookingsPage=lazy(()=>import('@/features/student/ServicePages').then(m=>({default:m.MyBookingsPage})))
const PaymentsPage=lazy(()=>import('@/features/student/ServicePages').then(m=>({default:m.PaymentsPage})))
const ContractDetailPage=lazy(()=>import('@/features/student/ServicePages').then(m=>({default:m.ContractDetailPage})))
const Ct01Page=lazy(()=>import('@/features/student/ServicePages').then(m=>({default:m.Ct01Page})))
const DisputesPage=lazy(()=>import('@/features/student/ServicePages').then(m=>({default:m.DisputesPage})))
const LandlordDashboardPage=lazy(()=>import('@/features/landlord/LandlordPages').then(m=>({default:m.LandlordDashboardPage})))
const PropertiesPage=lazy(()=>import('@/features/landlord/LandlordPages').then(m=>({default:m.PropertiesPage})))
const MyRoomsPage=lazy(()=>import('@/features/landlord/LandlordPages').then(m=>({default:m.MyRoomsPage})))
const RoomEditorPage=lazy(()=>import('@/features/landlord/LandlordPages').then(m=>({default:m.RoomEditorPage})))
const RoomVideoUploadPage=lazy(()=>import('@/features/landlord/LandlordPages').then(m=>({default:m.RoomVideoUploadPage})))
const LandlordVerificationPage=lazy(()=>import('@/features/landlord/LandlordPages').then(m=>({default:m.LandlordVerificationPage})))
const LandlordBookingsPage=lazy(()=>import('@/features/landlord/LandlordPages').then(m=>({default:m.LandlordBookingsPage})))
const AdminDashboardPage=lazy(()=>import('@/features/admin/AdminPages').then(m=>({default:m.AdminDashboardPage})))
const AdminUsersPage=lazy(()=>import('@/features/admin/AdminPages').then(m=>({default:m.AdminUsersPage})))
const AdminRoomsPage=lazy(()=>import('@/features/admin/AdminPages').then(m=>({default:m.AdminRoomsPage})))
const AdminVideosPage=lazy(()=>import('@/features/admin/AdminPages').then(m=>({default:m.AdminVideosPage})))
const AdminEkycPage=lazy(()=>import('@/features/admin/AdminPages').then(m=>({default:m.AdminEkycPage})))
const AdminContractsPage=lazy(()=>import('@/features/admin/AdminPages').then(m=>({default:m.AdminContractsPage})))
const AdminDisputesPage=lazy(()=>import('@/features/admin/AdminPages').then(m=>({default:m.AdminDisputesPage})))
const AdminTransactionsPage=lazy(()=>import('@/features/admin/AdminPages').then(m=>({default:m.AdminTransactionsPage})))
const ForbiddenPage=lazy(()=>import('@/features/system/SystemPages').then(m=>({default:m.ForbiddenPage})))
const NotFoundPage=lazy(()=>import('@/features/system/SystemPages').then(m=>({default:m.NotFoundPage})))
const UnauthorizedPage=lazy(()=>import('@/features/system/SystemPages').then(m=>({default:m.UnauthorizedPage})))

export default function App(){return <BrowserRouter><Suspense fallback={<LoadingState label="Đang mở trang..."/>}><Routes>
  <Route path="/dang-nhap" element={<LoginPage/>}/><Route path="/dang-ky" element={<RegisterPage/>}/><Route path="/401" element={<UnauthorizedPage/>}/><Route path="/403" element={<ForbiddenPage/>}/>
  <Route element={<ProtectedRoute/>}>
    <Route element={<AppShell/>}>
      <Route path="/tai-khoan" element={<ProfilePage/>}/>
      <Route element={<RoleGuard roles={['STUDENT']}/>}>
        <Route index element={<HomePage/>}/><Route path="/tim-phong" element={<SearchPage/>}/><Route path="/phong/:id" element={<RoomDetailPage/>}/><Route path="/dat-phong/:roomId" element={<BookingPage/>}/><Route path="/tin-nhan" element={<ConversationListPage/>}/><Route path="/tin-nhan/:id" element={<ChatPage/>}/><Route path="/bookings" element={<MyBookingsPage/>}/><Route path="/thanh-toan" element={<PaymentsPage/>}/><Route path="/hop-dong/:id" element={<ContractDetailPage/>}/><Route path="/ct01" element={<Ct01Page/>}/><Route path="/tranh-chap" element={<DisputesPage/>}/>
      </Route>
      <Route element={<RoleGuard roles={['LANDLORD']}/>}>
        <Route path="/chu-tro" element={<LandlordDashboardPage/>}/><Route path="/chu-tro/khu-tro" element={<PropertiesPage/>}/><Route path="/chu-tro/phong" element={<MyRoomsPage/>}/><Route path="/chu-tro/phong/tao" element={<RoomEditorPage/>}/><Route path="/chu-tro/phong/:id/sua" element={<RoomEditorPage/>}/><Route path="/chu-tro/phong/:roomId/video" element={<RoomVideoUploadPage/>}/><Route path="/chu-tro/xac-minh" element={<LandlordVerificationPage/>}/><Route path="/chu-tro/yeu-cau-thue" element={<LandlordBookingsPage/>}/><Route path="/chu-tro/tin-nhan" element={<ConversationListPage/>}/><Route path="/chu-tro/tin-nhan/:id" element={<ChatPage/>}/><Route path="/chu-tro/hop-dong/:id" element={<ContractDetailPage/>}/><Route path="/chu-tro/tranh-chap" element={<DisputesPage/>}/>
      </Route>
    </Route>
    <Route element={<RoleGuard roles={['ADMIN']}/>}><Route element={<AdminShell/>}>
      <Route path="/admin" element={<AdminDashboardPage/>}/><Route path="/admin/nguoi-dung" element={<AdminUsersPage/>}/><Route path="/admin/phong" element={<AdminRoomsPage/>}/><Route path="/admin/video" element={<AdminVideosPage/>}/><Route path="/admin/ekyc" element={<AdminEkycPage/>}/><Route path="/admin/hop-dong" element={<AdminContractsPage/>}/><Route path="/admin/tranh-chap" element={<AdminDisputesPage/>}/><Route path="/admin/giao-dich" element={<AdminTransactionsPage/>}/>
    </Route></Route>
  </Route>
  <Route path="/404" element={<NotFoundPage/>}/><Route path="*" element={<Navigate to="/404" replace/>}/>
</Routes></Suspense></BrowserRouter>}
