import type { User } from '@/entities/user.entity';
import type { CreateUserData } from '@/types/auth';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByUsername(username: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract save(user: CreateUserData): Promise<User>;
}


