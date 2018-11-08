
export class User {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  permissions: {
    [resourceName: string]: Array<'read' | 'write' | 'delete'>;
  };
}