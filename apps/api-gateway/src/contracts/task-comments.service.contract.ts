import type {
  CreateTaskCommentData,
  ListTaskCommentsParams,
  PaginatedTaskComments,
} from '@jungle/types';

export abstract class TaskCommentsServiceContract {
  abstract create(data: CreateTaskCommentData): Promise<{ id: string }>;
  abstract listByTask(
    params: ListTaskCommentsParams
  ): Promise<PaginatedTaskComments>;
}
