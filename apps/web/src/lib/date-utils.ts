import { format, differenceInDays, isBefore, isToday, isTomorrow, isYesterday, formatDistanceToNow as formatDistanceToNowFn } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatTaskDeadline(deadline: string | Date | null | undefined): string {
 if (!deadline) return 'Sem data de prazo'

 const date = new Date(deadline)
 const now = new Date()

 if (isToday(date)) {
  return 'Hoje'
 }

 if (isTomorrow(date)) {
  return 'Amanhã'
 }

 if (isYesterday(date)) {
  return 'Ontem'
 }

 if (isBefore(date, now)) {
  const daysPast = differenceInDays(now, date)
  return `Vencido há ${daysPast} dia${daysPast > 1 ? 's' : ''}`
 }

 const daysLeft = differenceInDays(date, now)
 return `${daysLeft} dia${daysLeft > 1 ? 's' : ''} restante${daysLeft > 1 ? 's' : ''}`
}

export function formatDate(date: string | Date): string {
 return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR })
}

export function formatDateTime(date: string | Date): string {
 return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: ptBR })
}

export function formatDistanceToNow(date: string | Date | null): string {
 if (!date) return 'Sem data de prazo'

 return formatDistanceToNowFn(new Date(date), { addSuffix: true, locale: ptBR })
}