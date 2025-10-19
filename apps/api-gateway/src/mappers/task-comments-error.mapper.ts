import { HttpException } from '@nestjs/common';

import { TASK_COMMENT_MESSAGES } from '@/constants/tasks.constants';

interface TaskCommentsServiceError {
  code: string;
  message: string;
  status: number;
}

export class TaskCommentsErrorMapper extends HttpException {
  constructor(error: TaskCommentsServiceError) {
    const { code, message, status } = error;

    const { responseBody, httpStatus } =
      TaskCommentsErrorMapper.mapErrorResponse({
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
      case TASK_COMMENT_MESSAGES.COMMENT_NOT_FOUND:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      case TASK_COMMENT_MESSAGES.CONTENT_REQUIRED:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      case TASK_COMMENT_MESSAGES.CONTENT_TOO_LONG:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      case TASK_COMMENT_MESSAGES.INVALID_TASK_ID:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      case TASK_COMMENT_MESSAGES.INVALID_USER_ID:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      case TASK_COMMENT_MESSAGES.UNAUTHORIZED_COMMENT_ACCESS:
        return {
          responseBody: { code, message },
          httpStatus: status,
        };

      default:
        return { responseBody: { code, message }, httpStatus: status };
    }
  }
}
