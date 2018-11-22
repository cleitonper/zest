import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken }       from '@nestjs/mongoose';

import { User }          from './types';
import { UserModelMock } from './user.model.mock';
import { UserService }   from './user.service';

describe('Service: User', () => {
  let service: UserService;
  let model: UserModelMock;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ UserService ],
    })
    .overrideProvider(getModelToken('User'))
    .useClass(UserModelMock)
    .compile();

    service = module.get<UserService>(UserService);
    model = new UserModelMock();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create: should create a user', async () => {
    const data: Partial<User> = { name: 'Amet', email: 'amet@email.com', password: 'secret' };
    const user: User = await model.create(data);
    expect(user).toMatchObject(data);
  });

  it('list: should return a users list', async () => {
    const expected = model.find();
    const usersList = await service.list();
    expect(usersList).toEqual(expected);
  });

  it('get: should return a user', async () => {
    const expected = model.findOne();
    const user = await service.get('randomid');
    expect(user).toEqual(expected);
  });

  it('update: should update a user', async () => {
    const update = { name: 'Amet' };
    const expected = model.findOneAndUpdate({}, update);
    const updatedUser = await service.update('randomid', update);
    expect(updatedUser).toEqual(expected);
    expect(updatedUser.name).toEqual(update.name);
  });

  it('delete: should delete a user', async () => {
    const isUserDeleted = await service.delete('randomid');
    expect(isUserDeleted).toBe(true);
  });
});
