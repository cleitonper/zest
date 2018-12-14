import { IsNumberString, IsOptional, IsMongoId, IsEnum, IsString, IsEmail, IsArray } from 'class-validator';

import { Order }  from '../enum/order.enum';
import { Fields } from '../enum/fields.enum';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class FindUserDTO {
  @IsMongoId()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly _id: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly name: string;

  @IsEmail()
  @IsOptional()
  @ApiModelPropertyOptional()
  readonly email: string;

  @IsNumberString()
  @IsOptional()
  @ApiModelPropertyOptional({ default: 1 })
  readonly page: number;

  @IsNumberString()
  @IsOptional()
  @ApiModelPropertyOptional({ default: 15 })
  readonly items: number;

  @IsEnum(Order, { message: '$property must be asc or desc' })
  @IsOptional()
  @ApiModelPropertyOptional({ default: 'asc' })
  readonly order: Order;

  @IsEnum(Fields, { message: '$value is not a valid value for ordenation' })
  @IsOptional()
  @ApiModelPropertyOptional({ default: '_id' })
  readonly orderby: string;

  @IsString({ each: true })
  @IsOptional()
  @ApiModelPropertyOptional({ type: [String], description: 'Valid values: _id, name, email or permissions' })
  readonly fields: string[];
}