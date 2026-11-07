import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { MessageCircle, Send, ShieldAlert } from 'lucide-react'
import { toast } from 'sonner'
import { chatApi } from '@/api/chat.api'
import { errorMessage } from '@/api/client'
import { EmptyState, ErrorState, LoadingState } from '@/components/common/States'
import { PageHeader } from '@/components/common/PageHeader'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Form'
import { formatDateTime } from '@/lib/utils'
import { useAuth } from '@/providers/AuthProvider'

export function ConversationListPage(){
  const query=useQuery({queryKey:['conversations'],queryFn:chatApi.list,refetchInterval:15000})
  return <><PageHeader title="Tin nhắn" description="Các cuộc trò chuyện được tách theo từng phòng."/>{query.isLoading?<LoadingState/>:query.isError?<ErrorState message={errorMessage(query.error)} retry={()=>query.refetch()}/>:query.data?.length?<div className="grid gap-3">{query.data.map(c=><Link to={`/tin-nhan/${c.id}`} key={c.id}><Card className="flex items-center gap-4 p-4 hover:border-brand-300"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-800"><MessageCircle/></span><div className="min-w-0 flex-1"><h2 className="truncate font-semibold">{c.roomTitle}</h2><p className="mt-1 text-xs text-slate-500">Cập nhật {formatDateTime(c.updatedAt)}</p></div><span className="text-sm font-semibold text-brand-700">Mở</span></Card></Link>)}</div>:<EmptyState title="Chưa có cuộc trò chuyện" description="Mở chi tiết một phòng và chọn “Nhắn với chủ trọ” để bắt đầu."/>}</>
}

export function ChatPage(){
  const{id=''}=useParams();const{user}=useAuth();const qc=useQueryClient();const[content,setContent]=useState('');const bottom=useRef<HTMLDivElement>(null)
  const conversations=useQuery({queryKey:['conversations'],queryFn:chatApi.list});const messages=useQuery({queryKey:['messages',id],queryFn:()=>chatApi.messages(id),refetchInterval:5000})
  const send=useMutation({mutationFn:()=>chatApi.send(id,content),onSuccess:()=>{setContent('');qc.invalidateQueries({queryKey:['messages',id]})},onError:e=>toast.error(errorMessage(e))})
  useEffect(()=>{void chatApi.markRead(id).catch(()=>undefined)},[id]);useEffect(()=>{bottom.current?.scrollIntoView({behavior:'smooth'})},[messages.data?.content.length])
  const current=conversations.data?.find(c=>c.id===id)
  if(messages.isLoading)return<LoadingState/>;if(messages.isError)return<ErrorState message={errorMessage(messages.error)}/>
  return <><PageHeader title={current?.roomTitle||'Cuộc trò chuyện'} description="Tin mới được kiểm tra mỗi 5 giây." back/><div className="mx-auto max-w-3xl"><div className="mb-3 flex gap-2 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900"><ShieldAlert className="h-5 w-5 shrink-0"/><span>Hệ thống giảm hiển thị email và số điện thoại, nhưng không bảo đảm ngăn trao đổi ngoài nền tảng.</span></div><Card className="flex h-[min(65vh,680px)] flex-col p-0"><div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">{messages.data?.content.length?messages.data.content.map(m=><div key={m.id} className={`flex ${m.senderId===user?.id?'justify-end':'justify-start'}`}><div className={`max-w-[82%] rounded-2xl px-4 py-3 ${m.senderId===user?.id?'rounded-br-md bg-brand-700 text-white':'rounded-bl-md bg-slate-100'}`}><p className="whitespace-pre-wrap text-sm leading-6">{m.content}</p><p className={`mt-1 text-[10px] ${m.senderId===user?.id?'text-brand-100':'text-slate-400'}`}>{formatDateTime(m.createdAt)}{m.masked?' · đã ẩn liên hệ':''}</p></div></div>):<EmptyState title="Chưa có tin nhắn" description="Hãy gửi lời chào để bắt đầu cuộc trò chuyện."/>}<div ref={bottom}/></div><form className="flex gap-2 border-t p-3" onSubmit={e=>{e.preventDefault();if(content.trim())send.mutate()}}><Input value={content} onChange={e=>setContent(e.target.value)} maxLength={2000} placeholder="Nhập tin nhắn..." aria-label="Nội dung tin nhắn"/><Button className="shrink-0 px-3" loading={send.isPending} aria-label="Gửi tin nhắn"><Send className="h-5 w-5"/><span className="hidden sm:inline">Gửi</span></Button></form></Card></div></>
}
