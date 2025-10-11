import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

import { MessagingRepository } from '@/tasks/repositories/messaging.repository'
import { OutboxRepository } from '@/tasks/repositories/outbox.repository'
import { OutboxEvent } from '@/types'

@Injectable()
export class OutboxProcessor {
  private readonly logger = new Logger(OutboxProcessor.name)

  constructor(
    private readonly outbox: OutboxRepository,
    private readonly messaging: MessagingRepository,
  ) {}

  @Cron('*/5 * * * * *')
  async processPendingEvents() {
    this.logger.log('🔄 Starting outbox processing...')

    try {
      const pendingEvents = await this.outbox.findPending(10)

      if (pendingEvents.length === 0) {
        this.logger.log('✅ No pending events found')
        return
      }

      this.logger.log(`📦 Found ${pendingEvents.length} pending events`)

      for (const event of pendingEvents) {
        await this.processEvent(event)
      }

      this.logger.log('✅ Outbox processing completed')
    } catch (error) {
      this.logger.error('❌ Error during outbox processing', error)
    }
  }

  private async processEvent(event: OutboxEvent) {
    this.logger.log(`Processing event: ${event.id} type: (${event.type})`)

    try {
      await this.messaging.publishEvent('tasks', event.type, event.data)

      await this.outbox.markAsPublished(event.id)

      this.logger.log(`✅ Event ${event.id} published successfully`)
    } catch (error) {
      this.logger.error(`❌ Failed to publish event ${event.id}:`, error)

      await this.outbox.markAsFailed(
        event.id,
        error instanceof Error ? error.message : 'Unknown error',
      )
    }
  }

  @Cron('0 3 * * *')
  async cleanupOldPublishedEvents() {
    this.logger.log('🧹 Starting cleanup of old published events...')

    try {
      const deletedCount = await this.outbox.cleanupOldPublishedEvents()

      this.logger.log(`🗑️ Cleaned up ${deletedCount} old published events`)
    } catch (error) {
      this.logger.error(
        '❌ Error during cleanup of old published events',
        error,
      )
    }
  }
}
