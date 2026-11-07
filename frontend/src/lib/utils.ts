import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
export const formatVnd = (value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value)
export const formatDate = (value: string) => new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }).format(new Date(value))
export const formatDateTime = (value: string) => new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(value))
export const today = () => new Date().toISOString().slice(0, 10)
