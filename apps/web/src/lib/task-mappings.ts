export const TASK_STATUS_LABELS = {
 TODO: 'Pendente',
 IN_PROGRESS: 'Em progresso',
 REVIEW: 'Em revisão',
 DONE: 'Concluída',
} as const

export const TASK_PRIORITY_LABELS = {
 LOW: 'Baixa',
 MEDIUM: 'Média',
 HIGH: 'Alta',
 URGENT: 'Urgente',
} as const

export const TASK_STATUS_VARIANTS = {
 TODO: 'outline' as const,
 IN_PROGRESS: 'secondary' as const,
 REVIEW: 'secondary' as const,
 DONE: 'default' as const,
} as const

export const TASK_PRIORITY_VARIANTS = {
 LOW: 'secondary' as const,
 MEDIUM: 'default' as const,
 HIGH: 'destructive' as const,
 URGENT: 'destructive' as const,
} as const

export function getTaskStatusLabel(status: string): string {
 return TASK_STATUS_LABELS[status as keyof typeof TASK_STATUS_LABELS] || status
}

export function getTaskPriorityLabel(priority: string): string {
 return TASK_PRIORITY_LABELS[priority as keyof typeof TASK_PRIORITY_LABELS] || priority
}

export function getTaskStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
 return TASK_STATUS_VARIANTS[status as keyof typeof TASK_STATUS_VARIANTS] || 'outline'
}

export function getTaskPriorityVariant(priority: string): "default" | "secondary" | "destructive" | "outline" {
 return TASK_PRIORITY_VARIANTS[priority as keyof typeof TASK_PRIORITY_VARIANTS] || 'secondary'
}
