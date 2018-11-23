import { User, UserMongoose } from './types';

/**
 * This array will be used as fake response
 * for mongoose model methods.
 *
 * Note that verifyPassword() method always check
 * if the password param is equal to a 'secret' string.
 */
const users: User[] = [
  {
    name: 'Lorem',
    email: 'lorem@email.com',
    password: 'secret',
    createdAt: new Date(),
    updatedAt: new Date(),
    permissions: { users: ['read', 'write', 'delete'] },
  },
  {
    name: 'Ipsum',
    email: 'ipsum@email.com',
    password: 'secret',
    createdAt: new Date(),
    updatedAt: new Date(),
    permissions: { users: ['read', 'write', 'delete'] },
  },
];

const usersObject = users.map((user): UserMongoose => {
  const userObject =  {
    ...user,
    verifyPassword: (password: string) => password === 'secret',
  };

  return userObject as UserMongoose;
});

export class UserModelMock {
  create(user?: Partial<User>): User {
    if (!user) throw { name: 'ValidationError', errors: [] };
    return user as User;
  }

  find(conditions: any = {}, projection: any = {}, options: any = { lean: true }): Array<User | UserMongoose> {
    if (conditions._id === 'null') return [];
    if (options.lean) return users;
    return usersObject;
  }

  findOne(conditions: any = {}, projection: any = {}, options: any = { lean: true }): User | UserMongoose {
    if (conditions._id === 'null') return null;
    if (options.lean) return users[0];
    return usersObject[0];
  }

  findOneAndUpdate(conditions: any = {}, update: Partial<User>, options: any = { lean: true }): User {
    if (conditions._id === 'null') return null;

    const userToUpdate = users[0];

    const updatedUser = Object.keys(update).reduce((user, propertyToUpdate) => {
      user[propertyToUpdate] = update[propertyToUpdate];
      return user;
    }, userToUpdate);

    return updatedUser;
  }

  findOneAndDelete(conditions: any = {}, options: any = { lean: true }): User {
    if (conditions._id === 'null') return null;
    return users[0];
  }
}