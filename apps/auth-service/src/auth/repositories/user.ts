import type { User } from '../entities/user.entity';
import type { CreateUserData } from '../../types';

export abstract class UsersRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: CreateUserData): Promise<User>;
}


