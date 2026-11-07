import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { AUTH_EVENT, TOKEN_KEY } from '@/api/client'
import { usersApi } from '@/api/users.api'
import type { AuthResponse, User, UserRole } from '@/types/api'

interface AuthContextValue { user: User | null; role: UserRole | null; loading: boolean; authenticate: (data: AuthResponse) => Promise<void>; logout: () => void; refresh: () => Promise<void> }
const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [roleHint, setRoleHint] = useState<UserRole | null>(() => localStorage.getItem('srent_role') as UserRole | null)
  const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)))
  const queryClient = useQueryClient()
  const logout = useCallback(() => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem('srent_role'); setUser(null); setRoleHint(null); queryClient.clear() }, [queryClient])
  const refresh = useCallback(async () => { if (!localStorage.getItem(TOKEN_KEY)) return; setLoading(true); try { setUser(await usersApi.me()) } catch { logout() } finally { setLoading(false) } }, [logout])
  const authenticate = useCallback(async (data: AuthResponse) => { localStorage.setItem(TOKEN_KEY, data.accessToken); localStorage.setItem('srent_role', data.role); setRoleHint(data.role); await refresh() }, [refresh])
  useEffect(() => { void refresh(); window.addEventListener(AUTH_EVENT, logout); return () => window.removeEventListener(AUTH_EVENT, logout) }, [refresh, logout])
  const value = useMemo(() => ({ user, role: user?.role || roleHint, loading, authenticate, logout, refresh }), [user, roleHint, loading, authenticate, logout, refresh])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = () => { const value = useContext(AuthContext); if (!value) throw new Error('useAuth must be inside AuthProvider'); return value }
