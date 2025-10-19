import type {
 CreateTaskAssignmentData,
 ListTaskAssignmentsParams,
 PaginatedTaskAssignments,
} from '@jungle/types';
import { Injectable } from '@nestjs/common';

import { HTTP_METHODS, TASKS_SERVICE_NAME } from '@/constants/tasks.constants';
import { ProxyServiceContract } from '@/contracts/proxy.service.contract';
import { TaskAssignmentsServiceContract } from '@/contracts/task-assignments.service.contract';
import { TaskAssignmentsErrorMapper } from '@/mappers/task-assignments-error.mapper';
import { ProxyRequestOptions } from '@/types';

@Injectable()
export class TaskAssignmentsService implements TaskAssignmentsServiceContract {
 constructor(private readonly proxyService: ProxyServiceContract) { }

 async assignUser(data: CreateTaskAssignmentData): Promise<{ id: string }> {
  const { taskId, userId, assignedBy } = data;
  return this.proxyTaskAssignmentsRequest({
   serviceName: TASKS_SERVICE_NAME,
   method: HTTP_METHODS.POST,
   path: `/tasks/${taskId}/assignments`,
   data: { userId },
   headers: {
    'x-authenticated-user-id': assignedBy,
   },
  });
 }

 async removeUser(
  taskId: string,
  userId: string,
  removedBy: string
 ): Promise<void> {
  return this.proxyTaskAssignmentsRequest({
   serviceName: TASKS_SERVICE_NAME,
   method: HTTP_METHODS.DELETE,
   path: `/tasks/${taskId}/assignments/${userId}`,
   headers: {
    'x-authenticated-user-id': removedBy,
   },
  });
 }

 async listByTask(
  params: ListTaskAssignmentsParams
 ): Promise<PaginatedTaskAssignments> {
  const { taskId, page, size } = params;
  return this.proxyTaskAssignmentsRequest<PaginatedTaskAssignments>({
   serviceName: TASKS_SERVICE_NAME,
   method: HTTP_METHODS.GET,
   path: `/tasks/${taskId}/assignments?page=${page}&size=${size}`,
  });
 }

 private async proxyTaskAssignmentsRequest<TResponse>({
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
   throw new TaskAssignmentsErrorMapper({
    code: errorData.error,
    message: errorData.message,
    status: response.status,
   });
  }

  return response.data;
 }
}
