import { User } from '.';

export class UserMongoose extends User {
  readonly verifyPassword: (password: string) => boolean;
}