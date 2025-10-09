import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'

import { User } from '@/auth/entities/user.entity'
import { UsersRepository } from '@/auth/repositories/user'
import type { CreateUserData } from '@/types/auth.types'

@Injectable()
export class TypeormUserRepository implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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
