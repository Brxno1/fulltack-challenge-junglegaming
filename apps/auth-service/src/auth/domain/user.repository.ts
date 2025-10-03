import { User } from '../../entities/user.entity';

export interface CreateUserInput {
  email: string;
  username: string;
  password: string;
};

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByUsername(username: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract save(user: Partial<User>): Promise<User>;
}


