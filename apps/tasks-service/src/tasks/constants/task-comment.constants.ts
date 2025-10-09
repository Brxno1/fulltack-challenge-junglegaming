export const TASK_COMMENT_MESSAGES = {
  TASK_NOT_FOUND: 'Task not found',
  COMMENT_CREATED: 'Comment created successfully',
  COMMENT_NOT_FOUND: 'Comment not found',
  INVALID_TASK_ID: 'Invalid task ID format',
  INVALID_USER_ID: 'Invalid user ID format',
  CONTENT_REQUIRED: 'Comment content is required',
  CONTENT_TOO_LONG: 'Comment content is too long',
  UNAUTHORIZED_COMMENT_ACCESS: 'Unauthorized access to comment',
} as const

export const TASK_COMMENT_ERROR_CODES = {
  TASK_NOT_FOUND: 'TASK_COMMENT_001',
  COMMENT_NOT_FOUND: 'TASK_COMMENT_002',
  INVALID_TASK_ID: 'TASK_COMMENT_003',
  INVALID_USER_ID: 'TASK_COMMENT_004',
  CONTENT_VALIDATION: 'TASK_COMMENT_005',
  UNAUTHORIZED_ACCESS: 'TASK_COMMENT_006',
} as const

export const TASK_COMMENT_VALIDATION = {
  CONTENT_MAX_LENGTH: 2000,
  CONTENT_MIN_LENGTH: 1,
} as const
