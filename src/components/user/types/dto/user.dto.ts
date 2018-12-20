import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail, IsString, ValidateNested } from 'class-validator';

import { UserPermissions } from '..';

export class User {
  _id: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly name: string;

  @IsEmail()
  @IsOptional()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  readonly password: string;

  @IsOptional()
  @ApiModelProperty({ type: Object })
  readonly permissions: UserPermissions;

  createdAt: Date;
  updatedAt: Date;
}