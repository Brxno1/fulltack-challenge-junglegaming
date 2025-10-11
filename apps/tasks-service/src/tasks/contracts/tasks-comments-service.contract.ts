import {
  CreateTaskCommentData,
  ListTaskCommentsParams,
  PaginatedTaskComments,
} from '@/types/task-comments'

export abstract class TasksCommentsContract {
  abstract create(data: CreateTaskCommentData): Promise<{ id: string }>
  abstract listByTask(
    params: ListTaskCommentsParams,
  ): Promise<PaginatedTaskComments>
}
