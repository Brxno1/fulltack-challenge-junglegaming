import { Module } from '@nestjs/common'

import { AuthModule } from '@/auth/auth.module'
import { TasksServiceContract } from '@/contracts/tasks.service.contract'
import { ProxyModule } from '@/proxy/proxy.module'

import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
  imports: [AuthModule, ProxyModule],
  controllers: [TasksController],
  providers: [{ provide: TasksServiceContract, useClass: TasksService }],
  exports: [],
})
export class TasksModule {}
