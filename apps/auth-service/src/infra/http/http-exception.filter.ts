import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpException, HttpStatus } from '@nestjs/common'

const MESSAGE_TO_CODE: Record<string, string> = {
  'Authentication failed': 'AUTH.INVALID_CREDENTIALS',
  'Invalid or expired token': 'AUTH.INVALID_TOKEN',
  'Registration failed': 'AUTH.REGISTRATION_CONFLICT',
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      const resp = exception.getResponse() as
        | string
        | { message?: string | string[]; code?: string }
      const originalMessage =
        typeof resp === 'string'
          ? resp
          : Array.isArray(resp?.message)
            ? resp.message[0]
            : resp?.message

      const code =
        (typeof resp === 'object' && resp?.code) ||
        (originalMessage ? MESSAGE_TO_CODE[originalMessage] : undefined) ||
        'AUTH.UNSPECIFIED'

      const body = {
        code,
        message:
          originalMessage ||
          (status === HttpStatus.INTERNAL_SERVER_ERROR
            ? 'Internal server error'
            : 'Request failed'),
      }

      response.status(status).json(body)
      return
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      code: 'INTERNAL.ERROR',
      message: 'Internal server error',
    })
  }
}
