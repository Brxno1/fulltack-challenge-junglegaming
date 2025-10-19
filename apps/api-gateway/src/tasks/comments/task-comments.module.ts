import { Module } from '@nestjs/common';

import { AuthModule } from '@/auth/auth.module';
import { TaskCommentsServiceContract } from '@/contracts/task-comments.service.contract';
import { ProxyModule } from '@/proxy/proxy.module';

import { TaskCommentsController } from './task-comments.controller';
import { TaskCommentsService } from './task-comments.service';

@Module({
  imports: [AuthModule, ProxyModule],
  controllers: [TaskCommentsController],
  providers: [
    { provide: TaskCommentsServiceContract, useClass: TaskCommentsService },
  ],
  exports: [],
})
export class TaskCommentsModule {}
