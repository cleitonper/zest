import { UserPermissions } from '.';

export class User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  permissions: UserPermissions;
}