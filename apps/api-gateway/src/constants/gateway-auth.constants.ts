export const AUTH_ENDPOINT = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  REFRESH: '/auth/refresh',
  HEALTH: '/health',
} as const

export const AUTH_SERVICE_NAME = 'auth' as const

export const HTTP_METHODS = {
  POST: 'POST',
  GET: 'GET',
} as const

export const AUTH_ERROR_MESSAGES = {
  AUTH_ERROR: 'Authentication failed',
} as const
