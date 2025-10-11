import type { PaginatedTaskComments } from '@jungle/types'
import type {
  CreateTaskCommentData,
  ListTaskCommentsParams,
} from '@/types/task-comments'

export abstract class TasksCommentsContract {
  abstract create(data: CreateTaskCommentData): Promise<{ id: string }>
  abstract listByTask(
    params: ListTaskCommentsParams,
  ): Promise<PaginatedTaskComments>
}
