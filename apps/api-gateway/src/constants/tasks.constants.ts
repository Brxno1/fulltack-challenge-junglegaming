export const TASK_MESSAGES = {
  TASK_NOT_FOUND: 'Task not found',
  NO_CHANGES_TO_UPDATE: 'No changes to update',
  DEADLINE_CANNOT_BE_IN_PAST: 'Deadline cannot be in the past',
  INVALID_DEADLINE_FORMAT: 'Invalid deadline format',
} as const;

export const TASK_COMMENT_MESSAGES = {
  COMMENT_CREATED: 'Comment created successfully',
  COMMENT_NOT_FOUND: 'Comment not found',
  INVALID_TASK_ID: 'Invalid task ID format',
  INVALID_USER_ID: 'Invalid user ID format',
  CONTENT_REQUIRED: 'Comment content is required',
  CONTENT_TOO_LONG: 'Comment content is too long',
  UNAUTHORIZED_COMMENT_ACCESS: 'Unauthorized access to comment',
} as const;

export const TASK_COMMENT_VALIDATION = {
  CONTENT_MAX_LENGTH: 2000,
  CONTENT_MIN_LENGTH: 1,
} as const;

export const TASK_ASSIGNMENT_MESSAGES = {
  USER_ASSIGNMENT_NOT_FOUND: 'User assignment not found',
  USER_ALREADY_ASSIGNED: 'User already assigned to this task',
  ONLY_CREATOR_CAN_ASSIGN: 'Only task creator can assign users',
  ONLY_CREATOR_CAN_REMOVE: 'Only task creator can remove user assignments',
  INVALID_TASK_ID: 'Invalid task ID format',
  INVALID_USER_ID: 'Invalid user ID format',
} as const;

export const TASK_ASSIGNMENT_VALIDATION = {
  PAGE_MIN: 1,
  SIZE_MIN: 1,
  SIZE_MAX: 100,
} as const;

export const TASKS_ENDPOINT = {
  CREATE: '/tasks',
  UPDATE: '/tasks/:taskId',
  DELETE: '/tasks/:taskId',
  FIND_BY_ID: '/tasks/:taskId',
  LIST: '/tasks',
} as const;

export const HTTP_METHODS = {
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  GET: 'GET',
} as const;

export const TASKS_SERVICE_NAME = 'tasks' as const;
