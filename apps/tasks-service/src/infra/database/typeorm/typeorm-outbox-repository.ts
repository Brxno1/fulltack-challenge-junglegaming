import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { OutboxEvent } from '@/tasks/entities/outbox-event.entity'
import { OutboxRepository } from '@/tasks/repositories/outbox.repository'
import {
  type CreateOutboxEventData,
  type OutboxEvent as OutboxEventData,
  OutboxEventStatus,
  TaskEventType,
} from '@/types'

@Injectable()
export class TypeormOutboxRepository implements OutboxRepository {
  constructor(
    @InjectRepository(OutboxEvent)
    private readonly outbox: Repository<OutboxEvent>,
  ) {}

  async create(data: CreateOutboxEventData): Promise<{ id: string }> {
    const outboxEvent = this.outbox.create({
      aggregateId: data.aggregateId,
      type: data.type,
      data: data.data,
      status: OutboxEventStatus.PENDING,
    })

    const { id } = await this.outbox.save(outboxEvent)
    return { id }
  }

  async findPending(limit = 10): Promise<OutboxEventData[]> {
    const events = await this.outbox.find({
      where: {
        status: OutboxEventStatus.PENDING,
      },
      order: {
        createdAt: 'ASC',
      },
      take: limit,
    })

    return events.map((event) => ({
      ...event,
      type: event.type as TaskEventType,
    }))
  }

  async markAsPublished(id: string): Promise<void> {
    await this.outbox.update(id, {
      status: OutboxEventStatus.PUBLISHED,
      publishedAt: new Date(),
    })
  }

  async markAsFailed(id: string, errorMessage: string): Promise<void> {
    await this.outbox.update(id, {
      status: OutboxEventStatus.FAILED,
      errorMessage,
    })
  }

  async incrementRetryCount(id: string): Promise<void> {
    await this.outbox
      .createQueryBuilder()
      .update(OutboxEvent)
      .set({
        retryCount: () => 'retryCount + 1',
      })
      .where('id = :id', { id })
      .execute()
  }

  async cleanupOldPublishedEvents(): Promise<number> {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    const result = await this.outbox
      .createQueryBuilder()
      .delete()
      .where('status = :status', { status: OutboxEventStatus.PUBLISHED })
      .andWhere('publishedAt < :date', { date: sevenDaysAgo })
      .execute()

    return result.affected || 0
  }
}
