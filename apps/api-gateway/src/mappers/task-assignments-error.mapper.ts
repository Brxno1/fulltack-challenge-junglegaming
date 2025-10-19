import { HttpException } from '@nestjs/common';

import { TASK_ASSIGNMENT_MESSAGES } from '@/constants/tasks.constants';

interface TaskAssignmentsServiceError {
  code: string;
  message: string;
  status: number;
}

export class TaskAssignmentsErrorMapper extends HttpException {
  constructor(error: TaskAssignmentsServiceError) {
    const { code, message, status } = error;

    const { responseBody, httpStatus } =
      TaskAssignmentsErrorMapper.mapErrorResponse({
        code,
        message,
        status,
      });

    super(responseBody, httpStatus);
  }

  private static mapErrorResponse({
    code,
    message,
    status,
  }: {
    code: string;
    message: string;
    status: number;
  }) {
    switch (code) {
      case TASK_ASSIGNMENT_MESSAGES.USER_ASSIGNMENT_NOT_FOUND:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      case TASK_ASSIGNMENT_MESSAGES.USER_ALREADY_ASSIGNED:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      case TASK_ASSIGNMENT_MESSAGES.ONLY_CREATOR_CAN_ASSIGN:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      case TASK_ASSIGNMENT_MESSAGES.ONLY_CREATOR_CAN_REMOVE:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      case TASK_ASSIGNMENT_MESSAGES.INVALID_TASK_ID:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      case TASK_ASSIGNMENT_MESSAGES.INVALID_USER_ID:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      default:
        return { responseBody: { code, message }, httpStatus: status };
    }
  }
}
