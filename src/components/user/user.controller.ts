import {
  Controller,
  Get, Post, Put, Delete,
  Query, Param, Body, HttpCode,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';

import { Projection, Pagination, Filter } from '../../shared/decorators';
import { JwtGuard, PermissionGuard }      from '../../shared/guards';

import { FindUserDTO, User } from './types';
import { UserService } from './user.service';

const USER_FILTERS = ['_id', 'name', 'email'];

@UseGuards(JwtGuard, PermissionGuard)
@Controller('users')
@ApiBearerAuth()
@ApiUseTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User): Promise<User> {
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
    @Body() update: Partial<User>,
    ) {
    return this.userService.update(id, update);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
