import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return <label className="grid gap-1.5 text-sm font-medium text-slate-700">
    <span>{label}</span>{children}
    {error ? <span className="text-xs font-normal text-red-600">{error}</span> : hint ? <span className="text-xs font-normal text-slate-500">{hint}</span> : null}
  </label>
}
const base = 'min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 disabled:bg-slate-100'
export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => <input className={cn(base, className)} {...props} />
export const Select = ({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => <select className={cn(base, className)} {...props} />
export const Textarea = ({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea className={cn(base, 'min-h-28 resize-y', className)} {...props} />
