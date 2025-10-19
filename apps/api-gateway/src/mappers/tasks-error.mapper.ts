import { HttpException } from '@nestjs/common';

import { TASK_MESSAGES } from '@/constants/tasks.constants';

interface TasksServiceError {
  code: string;
  message: string;
  status: number;
}

export class TasksErrorMapper extends HttpException {
  constructor(error: TasksServiceError) {
    const { code, message, status } = error;

    const { responseBody, httpStatus } = TasksErrorMapper.mapErrorResponse({
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
      case TASK_MESSAGES.TASK_NOT_FOUND:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      case TASK_MESSAGES.NO_CHANGES_TO_UPDATE:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      case TASK_MESSAGES.DEADLINE_CANNOT_BE_IN_PAST:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      case TASK_MESSAGES.INVALID_DEADLINE_FORMAT:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      default:
        return { responseBody: { code, message }, httpStatus: status };
    }
  }
}
