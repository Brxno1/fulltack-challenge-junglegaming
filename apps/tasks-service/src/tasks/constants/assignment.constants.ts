export const TASK_ASSIGNMENT_MESSAGES = {
  USER_ASSIGNMENT_NOT_FOUND: 'User assignment not found',
  USER_ALREADY_ASSIGNED: 'User already assigned to this task',
  ONLY_CREATOR_CAN_ASSIGN: 'Only task creator can assign users',
  ONLY_CREATOR_CAN_REMOVE: 'Only task creator can remove user assignments',
  INVALID_TASK_ID: 'Invalid task ID format',
  INVALID_USER_ID: 'Invalid user ID format',
} as const

export const TASK_ASSIGNMENT_VALIDATION = {
  PAGE_MIN: 1,
  SIZE_MIN: 1,
  SIZE_MAX: 100,
} as const
