import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

import { UserRepository } from '@/auth/domain/user.repository';
import { User } from '@/entities/user.entity';
import type { CreateUserData } from '@/types/auth';

@Injectable()
export class DatabaseUserRepository extends UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) { super(); }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repo.findOne({ where: { username } });
  }

  async findById(id: string): Promise<User | null> {
    return this.repo.findOne({ where: { id } });
  }

  save(user: CreateUserData): Promise<User> {
    return this.repo.save(user);
  }
}


