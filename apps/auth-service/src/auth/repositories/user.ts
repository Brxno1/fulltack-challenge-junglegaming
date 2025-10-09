import type { CreateUserData } from '../../types/auth.types'
import type { User } from '../entities/user.entity'

export abstract class UsersRepository {
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract save(user: CreateUserData): Promise<User>
}
