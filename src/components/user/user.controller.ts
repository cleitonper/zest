import { Controller, Get, Post, Put, Delete, Query, Param, Body, HttpCode } from '@nestjs/common';

import { Projection, Pagination, Filter }   from '../../decorators';
import { FindUserDTO, User, CreateUserDTO } from './types';
import { UserService } from './user.service';
import { MailerProvider } from '@nest-modules/mailer';

const USER_FILTERS = ['_id', 'name', 'email'];

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: CreateUserDTO): Promise<User> {
    return await this.userService.create(user);
  }

  @Get()
  async list(
    @Query() query: FindUserDTO,
    @Filter(USER_FILTERS) filters,
    @Projection() fields,
    @Pagination() paginationOptions,
    ): Promise<User[]> {
    return await this.userService.list(filters, fields, paginationOptions);
  }

  @Get(':id')
  async get(
    @Param('id') id: string,
    @Projection() fields,
    ): Promise<User> {
    return await this.userService.get(id, fields);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() update: Partial<CreateUserDTO>,
    ) {
    return this.userService.update(id, update);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
