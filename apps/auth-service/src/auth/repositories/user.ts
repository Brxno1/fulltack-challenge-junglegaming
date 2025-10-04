import type { CreateUserData } from '@jungle/types'

import type { User } from '../entities/user.entity'

export abstract class UsersRepository {
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract save(user: CreateUserData): Promise<User>
}
