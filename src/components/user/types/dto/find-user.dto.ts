import { IsNumberString, IsOptional, IsMongoId, IsEnum } from 'class-validator';

import { Order }  from '../enum/order.enum';
import { Fields } from '../enum/fields.enum';

import { CreateUserDTO } from './create-user.dto';

export class FindUserDTO extends CreateUserDTO {
  @IsNumberString()
  @IsOptional()
  readonly page: number;

  @IsNumberString()
  @IsOptional()
  readonly items: number;

  @IsEnum(Order, { message: '$property must be asc or desc' })
  @IsOptional()
  readonly order: Order;

  @IsEnum(Fields, { message: '$value is not a valid value for ordenation' })
  @IsOptional()
  readonly orderby: string;

  @IsMongoId()
  @IsOptional()
  readonly _id: string;

  @IsEnum(Fields, { message: '$value is a invalid field' })
  @IsOptional()
  readonly fields: string[] | string;
}