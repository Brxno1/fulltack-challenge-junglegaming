import { PaginatedTasks, Task } from '@jungle/types'
import { Injectable } from '@nestjs/common'

import {
  HTTP_METHODS,
  TASKS_ENDPOINT,
  TASKS_SERVICE_NAME,
} from '@/constants/tasks.constants'
import { ProxyServiceContract } from '@/contracts/proxy.service.contract'
import { TasksServiceContract } from '@/contracts/tasks.service.contract'
import { HttpMethod } from '@/types/proxy.types'
import {
  CreateTaskData,
  ListTasksParams,
  UpdateTaskData,
} from '@/types/tasks.types'

@Injectable()
export class TasksService implements TasksServiceContract {
  constructor(private readonly proxyService: ProxyServiceContract) {}

  async create(data: CreateTaskData): Promise<{ id: string }> {
    const { createdBy, ...rest } = data
    return this.proxyTasksRequest(
      TASKS_ENDPOINT.CREATE,
      HTTP_METHODS.POST,
      rest,
      {
        'x-authenticated-user-id': createdBy,
      },
    )
  }

  async update(
    taskId: string,
    actor: string,
    data: UpdateTaskData,
  ): Promise<void> {
    const response = await this.proxyService.forwardRequest<void, unknown>({
      serviceName: 'tasks',
      method: 'PATCH',
      path: `/tasks/${taskId}`,
      data,
      headers: {
        'x-authenticated-user-id': actor,
      },
    })

    return response.data
  }

  async delete(taskId: string, actor: string): Promise<void> {
    const response = await this.proxyService.forwardRequest<void, undefined>({
      serviceName: 'tasks',
      method: 'DELETE',
      path: `/tasks/${taskId}`,
      headers: {
        'x-authenticated-user-id': actor,
      },
    })

    return response.data
  }

  async findById(taskId: string): Promise<Task> {
    const response = await this.proxyService.forwardRequest<Task, unknown>({
      serviceName: 'tasks',
      method: 'GET',
      path: `/tasks/${taskId}`,
    })

    return response.data
  }

  async list(params: ListTasksParams): Promise<PaginatedTasks> {
    const { page, size } = params
    const response = await this.proxyService.forwardRequest<
      PaginatedTasks,
      ListTasksParams
    >({
      serviceName: 'tasks',
      method: 'GET',
      path: `${TASKS_ENDPOINT.LIST}?page=${page}&size=${size}`,
    })

    return response.data
  }

  private async proxyTasksRequest<TResponse>(
    endpoint: string,
    method: HttpMethod,
    data?: unknown,
    headers?: Record<string, string>,
  ): Promise<TResponse> {
    const response = await this.proxyService.forwardRequest<TResponse, unknown>(
      {
        serviceName: TASKS_SERVICE_NAME,
        method,
        data,
        headers,
        path: endpoint,
      },
    )

    return response.data
  }
}
