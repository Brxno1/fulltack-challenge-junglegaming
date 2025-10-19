import { Module } from '@nestjs/common';

import { AuthModule } from '@/auth/auth.module';
import { ProxyModule } from '@/proxy/proxy.module';
import { TaskAssignmentsServiceContract } from '@/contracts/task-assignments.service.contract';

import { TaskAssignmentsController } from './task-assignments.controller';
import { TaskAssignmentsService } from './task-assignments.service';

@Module({
  imports: [AuthModule, ProxyModule],
  controllers: [TaskAssignmentsController],
  providers: [
    {
      provide: TaskAssignmentsServiceContract,
      useClass: TaskAssignmentsService,
    },
  ],
})
export class TaskAssignmentsModule {}
