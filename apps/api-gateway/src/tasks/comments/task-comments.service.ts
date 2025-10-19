import type {
  CreateTaskCommentData,
  ListTaskCommentsParams,
  PaginatedTaskComments,
} from '@jungle/types';
import { Injectable } from '@nestjs/common';

import { HTTP_METHODS, TASKS_SERVICE_NAME } from '@/constants/tasks.constants';
import { ProxyServiceContract } from '@/contracts/proxy.service.contract';
import { TaskCommentsServiceContract } from '@/contracts/task-comments.service.contract';
import { TaskCommentsErrorMapper } from '@/mappers/task-comments-error.mapper';
import { ProxyRequestOptions } from '@/types';

@Injectable()
export class TaskCommentsService implements TaskCommentsServiceContract {
  constructor(private readonly proxyService: ProxyServiceContract) {}

  async create(data: CreateTaskCommentData): Promise<{ id: string }> {
    const { taskId, author, content } = data;
    return this.proxyTaskCommentsRequest({
      serviceName: TASKS_SERVICE_NAME,
      method: HTTP_METHODS.POST,
      path: `/tasks/${taskId}/comments`,
      data: { content },
      headers: {
        'x-authenticated-user-id': author,
      },
    });
  }

  async listByTask(
    params: ListTaskCommentsParams
  ): Promise<PaginatedTaskComments> {
    const { taskId, page, size } = params;
    return this.proxyTaskCommentsRequest<PaginatedTaskComments>({
      serviceName: TASKS_SERVICE_NAME,
      method: HTTP_METHODS.GET,
      path: `/tasks/${taskId}/comments?page=${page}&size=${size}`,
    });
  }

  private async proxyTaskCommentsRequest<TResponse>({
    serviceName,
    method,
    path,
    data,
    headers = {},
  }: ProxyRequestOptions): Promise<TResponse> {
    const response = await this.proxyService.forwardRequest<TResponse>({
      serviceName,
      method,
      data,
      headers,
      path,
    });

    if (response.error) {
      const errorData = response.data as unknown as {
        error: string;
        message: string;
      };
      throw new TaskCommentsErrorMapper({
        code: errorData.error,
        message: errorData.message,
        status: response.status,
      });
    }

    return response.data;
  }
}
