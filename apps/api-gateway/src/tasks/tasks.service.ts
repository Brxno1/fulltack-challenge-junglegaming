import type {
  CreateTaskData,
  ListTasksParams,
  PaginatedTasks,
  Task,
  UpdateTaskData,
} from '@jungle/types';
import { Injectable } from '@nestjs/common';

import {
  HTTP_METHODS,
  TASKS_ENDPOINT,
  TASKS_SERVICE_NAME,
} from '@/constants/tasks.constants';
import { ProxyServiceContract } from '@/contracts/proxy.service.contract';
import { TasksServiceContract } from '@/contracts/tasks.service.contract';
import { TasksErrorMapper } from '@/mappers/tasks-error.mapper';
import { ProxyRequestOptions } from '@/types';

@Injectable()
export class TasksService implements TasksServiceContract {
  constructor(private readonly proxyService: ProxyServiceContract) { }

  async create(data: CreateTaskData): Promise<{ id: string }> {
    const { author, ...rest } = data;
    return this.proxyTasksRequest({
      serviceName: TASKS_SERVICE_NAME,
      method: HTTP_METHODS.POST,
      path: TASKS_ENDPOINT.CREATE,
      data: rest,
      headers: {
        'x-authenticated-user-id': author,
      },
    });
  }

  async update(taskId: string, data: UpdateTaskData): Promise<void> {
    const { author, ...rest } = data;
    await this.proxyTasksRequest({
      serviceName: TASKS_SERVICE_NAME,
      method: HTTP_METHODS.PATCH,
      path: `/tasks/${taskId}`,
      data: rest,
      headers: {
        'x-authenticated-user-id': author,
      },
    });
  }

  async delete(taskId: string, author: string): Promise<void> {
    await this.proxyTasksRequest({
      serviceName: TASKS_SERVICE_NAME,
      method: HTTP_METHODS.DELETE,
      path: `/tasks/${taskId}`,
      headers: {
        'x-authenticated-user-id': author,
      },
    });
  }

  async findById(taskId: string): Promise<Task | null> {
    const response = await this.proxyTasksRequest<Task | null>({
      serviceName: TASKS_SERVICE_NAME,
      method: HTTP_METHODS.GET,
      path: `/tasks/${taskId}`,
    });

    return response;
  }

  async list(params: ListTasksParams): Promise<PaginatedTasks> {
    const { page, size } = params;
    const response = await this.proxyTasksRequest<PaginatedTasks>({
      serviceName: TASKS_SERVICE_NAME,
      method: HTTP_METHODS.GET,
      path: `${TASKS_ENDPOINT.LIST}?page=${page}&size=${size}`,
    });

    return response;
  }

  private async proxyTasksRequest<TResponse>({
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
      throw new TasksErrorMapper({
        code: errorData.error,
        message: errorData.message,
        status: response.status,
      });
    }

    return response.data;
  }
}
