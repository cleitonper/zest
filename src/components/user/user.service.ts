import { Injectable, BadRequestException, NotFoundException }  from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model }       from 'mongoose';

import { User } from './types';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly user: Model<User>) {}

  async create(data: Partial<User>): Promise<User> {
    try {
      return await this.user.create(data);
    } catch (error) {
      throw new BadRequestException(error.errors, 'Validation error');
    }
  }

  async list(conditions = {}, projection = {}, options = { lean: true }): Promise<User[]> {
    const users = await this.user.find(conditions, projection, options);
    if (!users.length) throw new NotFoundException(null, 'No user found');
    return users;
  }

  async get(id: string, fields = {}, options = { lean: true }): Promise<User> {
    const user = await this.user.findOne({ _id: id }, fields, options);
    if (!user) throw new NotFoundException(null, 'User not found');
    return user;
  }

  async getByEmail(email: string, fields = {}, options = { lean: false }) {
    return await this.user.findOne({ email }, fields, options);
  }

  async update(id: string, update: Partial<User>, options = { lean: true, new: true, runValidators: true }) {
    const conditions = { _id: id };
    const newData = { $set: update };
    const updatedUser = await this.user.findOneAndUpdate(conditions, newData, options);
    if (!updatedUser) throw new NotFoundException(null, 'User not found');
    return updatedUser;
  }

  async delete(id: string, options = { lean: true }): Promise<boolean> {
    const deletedUser = await this.user.findOneAndDelete({ _id: id }, options);
    if (!deletedUser) throw new NotFoundException(null, 'User not found');
    return true;
  }
}
