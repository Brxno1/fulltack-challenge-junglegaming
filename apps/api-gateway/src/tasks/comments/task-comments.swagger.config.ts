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
  CreateTaskCommentDto,
  CreateTaskCommentResponseDto,
  PaginatedTaskCommentsResponseDto,
} from '../../dtos/task-comments.dto';

export const TaskCommentsSwaggerConfig = {
  controller: () => ApiTags('Task Comments'),

  create: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Create a comment for a task',
        description: 'Creates a new comment for the specified task',
      }),
      ApiParam({
        name: 'taskId',
        description: 'Task unique identifier',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),
      ApiBody({
        type: CreateTaskCommentDto,
        description: 'Comment creation payload',
      }),
      ApiResponse({
        status: 201,
        description: 'Comment created successfully',
        type: CreateTaskCommentResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid payload or validation error',
        schema: {
          example: {
            code: 'TASK.INVALID_TASK_ID',
            message: 'Invalid task ID format',
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

  list: () =>
    applyDecorators(
      ApiOperation({
        summary: 'List comments for a task',
        description:
          'Retrieves a paginated list of comments for the specified task',
      }),
      ApiParam({
        name: 'taskId',
        description: 'Task unique identifier',
        example: '123e4567-e89b-12d3-a456-426614174000',
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
        description: 'Number of comments per page (max 100)',
        example: 10,
      }),
      ApiResponse({
        status: 200,
        description: 'Comments retrieved successfully',
        type: PaginatedTaskCommentsResponseDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid task ID format',
        schema: {
          example: {
            code: 'TASK.INVALID_TASK_ID',
            message: 'Invalid task ID format',
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
};
