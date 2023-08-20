import { UserType } from './user.type';

export interface UserResponseInterface {
  user: UserType & { accessToken: string; refreshToken: string };
}
