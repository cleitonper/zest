import { IsOptional, IsEmail, IsString } from 'class-validator';

import { UserPermissions } from '..';

export class CreateUserDTO {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly password: string;

  @IsOptional()
  readonly permissions: UserPermissions;
}