import { User, UserMongoose } from './types';

/**
 * This array will be used as fake response
 * for mongoose model methods.
 *
 * Note that verifyPassword() method always check
 * if the password param is equal to a 'secret' string.
 */
const users = [
  { name: 'Lorem', email: 'lorem@email.com', password: 'secret' } as User,
  { name: 'Ipsum', email: 'ipsum@email.com', password: 'secret' } as User,
];

const usersObject = users.map((user): UserMongoose => {
  const userObject =  {
    ...user,
    verifyPassword: (password: string) => password === 'secret',
  };

  return userObject as UserMongoose;
});

export class UserModelMock {
  create(user: Partial<User>): User {
    return user as User;
  }

  find(conditions = {}, projection = {}, options = { lean: true }): Array<User | UserMongoose> {
    if (options.lean) return users;
    return usersObject;
  }

  findOne(conditions = {}, projection = {}, options = { lean: true }): User | UserMongoose {
    if (options.lean) return users[0];
    return usersObject[0];
  }

  findOneAndUpdate(conditions = {}, update: Partial<User>, options = { lean: true }): User {
    const userToUpdate = users[0];

    const updatedUser = Object.keys(update).reduce((user, propertyToUpdate) => {
      user[propertyToUpdate] = update[propertyToUpdate];
      return user;
    }, userToUpdate);

    return updatedUser;
  }

  findOneAndDelete(conditions = {}, options = { lean: true }): User {
    return users[0];
  }
}