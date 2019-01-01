import { IsEmail }          from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class Identifier {
  @IsEmail()
  @ApiModelProperty()
  email: string;
}