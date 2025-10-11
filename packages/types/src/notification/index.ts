export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'task_assigned' | 'task_updated' | 'comment_added'
  read: boolean
  createdAt: Date
}

export interface WebSocketEvent<T = unknown> {
  type: 'task:created' | 'task:updated' | 'comment:new'
  data: T
  userId?: string
}
