import type {
  PaginatedTaskAssignments,
  TaskAssignment as TaskAssignmentData,
} from '@jungle/types'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TaskAssignment } from '@/tasks/entities/task-assignment.entity'
import { TaskAssignmentsRepository } from '@/tasks/repositories/task-assignments.repository'
import type {
  CreateTaskAssignmentData,
  ListTaskAssignmentsParams,
} from '@/types/task-assignments'

@Injectable()
export class TypeormTaskAssignmentsRepository
  implements TaskAssignmentsRepository
{
  constructor(
    @InjectRepository(TaskAssignment)
    private readonly taskAssignmentRepository: Repository<TaskAssignment>,
  ) {}

  async create(data: CreateTaskAssignmentData): Promise<{ id: string }> {
    const { id } = await this.taskAssignmentRepository.save(data)
    return { id }
  }

  async findByTaskAndUser(
    taskId: string,
    userId: string,
  ): Promise<TaskAssignmentData | null> {
    const assignment = await this.taskAssignmentRepository.findOne({
      where: { taskId, userId },
    })

    return assignment
  }

  async listByTask({
    taskId,
    page,
    size,
  }: ListTaskAssignmentsParams): Promise<PaginatedTaskAssignments> {
    const [assignments, total] =
      await this.taskAssignmentRepository.findAndCount({
        where: { taskId },
        order: {
          createdAt: 'ASC',
        },
        skip: (page - 1) * size,
        take: size,
      })

    return {
      assignments,
      total,
    }
  }

  async delete(taskId: string, userId: string): Promise<void> {
    await this.taskAssignmentRepository.delete({
      taskId,
      userId,
    })
  }
}
