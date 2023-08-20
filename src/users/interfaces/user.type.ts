import { User } from '../entities/user.entity';

//retur user Entity except password
export type UserType = Omit<User, 'hashPassword'>;
