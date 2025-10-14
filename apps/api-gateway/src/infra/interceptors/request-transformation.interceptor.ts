import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class RequestTransformationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest()

    if (request.user) {
      request.headers['x-authenticated-user-id'] = request.user.userId
    }

    return next.handle().pipe(
      map((data) => {
        return data
      }),
    )
  }
}
