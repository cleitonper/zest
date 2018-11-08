import { User } from './types';

const users = [
  { name: 'Lorem', email: 'lorem@email.com', password: 'lsecret' } as User,
  { name: 'Ipsum', email: 'ipsum@email.com', password: 'isecret' } as User,
];

export class UserModelMock {
  create(user: Partial<User>): User {
    return user as User;
  }

  find(): User[] {
    return users;
  }

  findOne(): User {
    return users[0];
  }

  findOneAndUpdate(update: Partial<User>) {
    const userToUpdate = users[0];

    return Object.keys(update).reduce((user, propertyToUpdate) => {
      user[propertyToUpdate] = update[propertyToUpdate];
      return user;
    }, userToUpdate);
  }

  findOneAndDelete(): User {
    return users[0];
  }
}