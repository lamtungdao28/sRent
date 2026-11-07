import { useQuery } from '@tanstack/react-query'
import { Building2, MapPin, Maximize2, UsersRound, Wifi } from 'lucide-react'
import { Link } from 'react-router-dom'
import { mediaApi } from '@/api/media.api'
import { Card } from '@/components/ui/Card'
import { StatusBadge } from '@/components/common/StatusBadge'
import { formatVnd } from '@/lib/utils'
import type { Room } from '@/types/api'

export function RoomCard({ room, management = false }: { room: Room; management?: boolean }) {
  const images = useQuery({ queryKey: ['room-images', room.id], queryFn: () => mediaApi.images(room.id), retry: false })
  const image = images.data?.[0]?.url
  return <Card className="group overflow-hidden p-0 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg">
    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-100 via-sky-100 to-slate-100">{image?<img src={image} alt={`Ảnh ${room.title}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"/>:<div className="grid h-full place-items-center"><Building2 className="h-12 w-12 text-brand-300"/></div>}<div className="absolute left-3 top-3 flex gap-2"><StatusBadge status={management?room.approvalStatus:room.status}/></div></div>
    <div className="p-4"><div className="flex items-start justify-between gap-3"><h3 className="line-clamp-2 font-bold text-slate-950">{room.title}</h3><span className="shrink-0 text-sm font-bold text-brand-700">{formatVnd(room.monthlyPrice)}<small className="font-normal text-slate-500">/tháng</small></span></div>
      <p className="mt-2 flex items-start gap-1.5 text-sm text-slate-500"><MapPin className="mt-0.5 h-4 w-4 shrink-0"/><span className="line-clamp-1">{room.address}, {room.district}, {room.city}</span></p>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-600"><span className="flex items-center gap-1"><Maximize2 className="h-4 w-4"/>{room.areaSqm} m²</span><span className="flex items-center gap-1"><UsersRound className="h-4 w-4"/>{room.maxOccupants} người</span>{room.amenities[0]&&<span className="flex items-center gap-1"><Wifi className="h-4 w-4"/>{room.amenities[0]}</span>}</div>
      {room.rejectionReason&&<p className="mt-3 rounded-lg bg-red-50 p-2 text-xs text-red-700">Lý do: {room.rejectionReason}</p>}
      <Link className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-brand-50 px-4 text-sm font-semibold text-brand-800 hover:bg-brand-100" to={management?`/chu-tro/phong/${room.id}/sua`:`/phong/${room.id}`}>{management?'Quản lý phòng':'Xem chi tiết'}</Link>
    </div>
  </Card>
}
