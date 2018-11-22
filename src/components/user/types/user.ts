import { UserPermissions } from '.';

export class User {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  permissions: UserPermissions;
}