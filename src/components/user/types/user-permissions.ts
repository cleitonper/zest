import { ApiModelProperty } from '@nestjs/swagger';

export class UserPermissions {
  readonly [resourceName: string]: Array<'read' | 'write' | 'delete'>;
}