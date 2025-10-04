import type { CreateUserData } from '../../../types/auth.types'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'

import { User } from '@/auth/entities/user.entity'
import { UsersRepository } from '@/auth/repositories/user'

@Injectable()
export class DatabaseUserRepository extends UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super()
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } })
  }

  save(user: CreateUserData): Promise<User> {
    return this.userRepository.save(user)
  }
}
