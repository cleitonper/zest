export class UserPermissions {
  readonly [resourceName: string]: Array<'read' | 'write' | 'delete'>;
}