import type { UserRole } from '@/types/api'

export function roleHome(role: UserRole | null | undefined) {
  if (role === 'ADMIN') return '/admin'
  if (role === 'LANDLORD') return '/chu-tro'
  return '/'
}

export function canRoleOpenPath(role: UserRole, path: string) {
  const pathname = path.split('?')[0] || '/'

  if (role === 'ADMIN') return pathname === '/admin' || pathname.startsWith('/admin/')
  if (role === 'LANDLORD') return pathname === '/tai-khoan' || pathname === '/chu-tro' || pathname.startsWith('/chu-tro/')

  return !pathname.startsWith('/admin') && !pathname.startsWith('/chu-tro') && pathname !== '/tai-khoan/admin'
}

export function destinationAfterAuth(role: UserRole, requestedPath?: string) {
  return requestedPath && canRoleOpenPath(role, requestedPath) ? requestedPath : roleHome(role)
}
