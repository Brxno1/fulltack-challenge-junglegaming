import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>()
    const response = context.switchToHttp().getResponse<Response>()

    const { method, url, ip } = request
    const userAgent = request.get('User-Agent') || ''
    const startTime = Date.now()

    this.logger.log(`${method} ${url} - ${ip} - ${userAgent}`)

    return next.handle().pipe(
      tap(() => {
        const { statusCode } = response
        const duration = Date.now() - startTime
        this.logger.log(`${method} ${url} - ${statusCode} - ${duration}ms`)
      }),
    )
  }
}
