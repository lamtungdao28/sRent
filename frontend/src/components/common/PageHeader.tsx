import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function PageHeader({ title, description, action, back = false }: { title: string; description?: string; action?: React.ReactNode; back?: boolean }) {
  const navigate = useNavigate()
  return <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div className="flex gap-3">{back && <button aria-label="Quay lại" className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-white hover:bg-slate-50" onClick={() => navigate(-1)}><ArrowLeft className="h-5 w-5"/></button>}<div><h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>{description && <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>}</div></div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
}
