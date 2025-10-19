export interface TaskComment {
  id: string
  taskId: string
  userId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface PaginatedTaskComments {
  comments: TaskComment[]
  total: number
}

export interface ListTaskCommentsParams {
  taskId: string
  page: number
  size: number
}

export interface CreateTaskCommentData {
  taskId: string
  author: string
  content: string
}
