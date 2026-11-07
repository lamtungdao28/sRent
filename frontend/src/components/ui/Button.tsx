import type { ButtonHTMLAttributes } from 'react'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; loading?: boolean }

export function Button({ className, variant = 'primary', loading, children, disabled, ...props }: Props) {
  const variants: Record<Variant, string> = {
    primary: 'bg-brand-700 text-white hover:bg-brand-800 shadow-sm',
    secondary: 'bg-sky-100 text-sky-800 hover:bg-sky-200',
    outline: 'border bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-slate-600 hover:bg-slate-100',
  }
  return <button className={cn('inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60', variants[variant], className)} disabled={disabled || loading} {...props}>
    {loading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}{children}
  </button>
}
