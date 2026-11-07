import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LoadingState } from '@/components/common/States'
import { useAuth } from '@/providers/AuthProvider'
import type { UserRole } from '@/types/api'

export function ProtectedRoute() { const { user, loading } = useAuth(); const location = useLocation(); if (loading) return <LoadingState label="Đang xác thực..."/>; return user ? <Outlet/> : <Navigate to="/dang-nhap" replace state={{ from: location.pathname }} /> }
export function RoleGuard({ roles }: { roles: UserRole[] }) { const { role } = useAuth(); return role && roles.includes(role) ? <Outlet/> : <Navigate to="/403" replace/> }
