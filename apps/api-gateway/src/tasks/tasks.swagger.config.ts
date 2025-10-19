import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateTaskDto,
  CreateTaskResponseDto,
  PaginatedTasksResponseDto,
  TaskResponseDto,
  UpdateTaskDto,
} from '../dtos/tasks.dto';

export const TasksSwaggerConfig = {
  controller: () => ApiTags('Tasks'),

  list: () =>
    applyDecorators(
      ApiOperation({
        summary: 'List all tasks',
        description:
          'Retrieves a paginated list of tasks for the authenticated user',
      }),
      ApiQuery({
        name: 'page',
        required: false,
        description: 'Page number for pagination',
        example: 1,
      }),
      ApiQuery({
        name: 'size',
        required: false,
        description: 'Number of items per page (max 100)',
        example: 10,
      }),
      ApiResponse({
        status: 200,
        description: 'Tasks retrieved successfully',
        type: PaginatedTasksResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized - Invalid or missing JWT token',
      })
    ),

  findById: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Get task by ID',
        description: 'Retrieves a specific task by its unique identifier',
      }),
      ApiParam({
        name: 'taskId',
        description: 'Task unique identifier',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),
      ApiResponse({
        status: 200,
        description: 'Task retrieved successfully',
        type: TaskResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized - Invalid or missing JWT token',
      }),
      ApiResponse({
        status: 404,
        description: 'Task not found',
        schema: {
          example: {
            code: 'TASK.NOT_FOUND',
            message: 'Task not found',
          },
        },
      })
    ),

  create: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Create a new task',
        description: 'Creates a new task for the authenticated user',
      }),
      ApiBody({
        type: CreateTaskDto,
        description: 'Task creation payload',
      }),
      ApiResponse({
        status: 201,
        description: 'Task created successfully',
        type: CreateTaskResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid payload or validation error',
        schema: {
          example: {
            code: 'TASK.INVALID_DEADLINE',
            message: 'Deadline cannot be in the past',
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized - Invalid or missing JWT token',
      })
    ),

  update: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Update task',
        description:
          'Updates an existing task. Only the creator can update their tasks.',
      }),
      ApiParam({
        name: 'taskId',
        description: 'Task unique identifier',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),
      ApiBody({
        type: UpdateTaskDto,
        description: 'Task update payload (all fields are optional)',
      }),
      ApiResponse({
        status: 200,
        description: 'Task updated successfully',
      }),
      ApiResponse({
        status: 400,
        description:
          'Invalid payload, validation error, or no changes to update',
        schema: {
          examples: {
            noChanges: {
              code: 'TASK.NO_CHANGES_TO_UPDATE',
              message: 'No changes to update',
            },
            invalidDeadline: {
              code: 'TASK.DEADLINE_IN_PAST',
              message: 'Deadline cannot be in the past',
            },
            invalidPriority: {
              code: 'TASK.INVALID_PRIORITY',
              message:
                'priority must be one of the following values: LOW, MEDIUM, HIGH, URGENT',
            },
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized - Invalid or missing JWT token',
      }),
      ApiResponse({
        status: 404,
        description: 'Task not found',
        schema: {
          example: {
            code: 'TASK.NOT_FOUND',
            message: 'Task not found',
          },
        },
      })
    ),

  delete: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Delete task',
        description:
          'Soft deletes a task. Only the creator can delete their tasks.',
      }),
      ApiParam({
        name: 'taskId',
        description: 'Task unique identifier',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),
      ApiResponse({
        status: 200,
        description: 'Task deleted successfully',
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized - Invalid or missing JWT token',
      }),
      ApiResponse({
        status: 404,
        description: 'Task not found',
        schema: {
          example: {
            code: 'TASK.NOT_FOUND',
            message: 'Task not found',
          },
        },
      })
    ),
};
