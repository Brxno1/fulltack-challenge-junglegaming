import { HttpException, HttpStatus } from '@nestjs/common'

interface AuthServiceError {
  code: string
  message: string
}

export class AuthErrorMapper extends HttpException {
  constructor(error: AuthServiceError, status: number) {
    const { code, message } = error

    const { responseBody, httpStatus } = AuthErrorMapper.mapErrorResponse({
      code,
      message,
      status,
    })

    super(responseBody, httpStatus)
  }

  private static mapErrorResponse({
    code,
    message,
    status,
  }: {
    code: string
    message: string
    status: number
  }) {
    switch (code) {
      case 'AUTH.INVALID_CREDENTIALS':
        return {
          responseBody: { code: 'AUTH.INVALID_CREDENTIALS', message },
          httpStatus: status || HttpStatus.UNAUTHORIZED,
        }

      case 'AUTH.INVALID_TOKEN':
        return {
          responseBody: { code: 'AUTH.INVALID_TOKEN', message },
          httpStatus: status || HttpStatus.UNAUTHORIZED,
        }

      case 'AUTH.REGISTRATION_CONFLICT':
        return {
          responseBody: { code: 'AUTH.REGISTRATION_CONFLICT', message },
          httpStatus: status || HttpStatus.CONFLICT,
        }

      case 'AUTH.UNSPECIFIED':
        return {
          responseBody: { code: 'AUTH.UNSPECIFIED', message },
          httpStatus: status || HttpStatus.INTERNAL_SERVER_ERROR,
        }

      default:
        return {
          responseBody: {
            code: 'AUTH.UNKNOWN_ERROR',
            message,
          },
          httpStatus: status || HttpStatus.INTERNAL_SERVER_ERROR,
        }
    }
  }
}
