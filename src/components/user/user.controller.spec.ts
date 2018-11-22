import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken }       from '@nestjs/mongoose';

import { UserModelMock } from './user.model.mock';
import { FindUserDTO, User }   from './types';

import { UserController } from './user.controller';
import { UserService }    from './user.service';

describe('Controller: User', () => {
  let controller: UserController;
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ UserService ],
      controllers: [ UserController ],
    }).overrideProvider(getModelToken('User'))
      .useClass(UserModelMock)
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create: should create a user', async () => {
    const data = { name: 'Amet', email: 'amet@email.com', password: 'secret' } as User;
    spyOn(service, 'create').and.returnValue(data);
    const user = await controller.create(data);
    expect(user).toMatchObject(data);
  });

  it('list: should return a users list', async () => {
    const expected = await service.list();
    const usersList = await controller.list({} as FindUserDTO, {}, {}, { lean: true });
    expect(usersList).toEqual(expected);
  });

  it('get: should return a user', async () => {
    const id = 'randomid';
    const fields = {};
    const expected = await service.get(id, fields);
    const user = await controller.get(id, fields);
    expect(user).toEqual(expected);
  });

  it('update: should update a user', async () => {
    const update = { name: 'Jaspion', email: 'jaspion@email.com' };
    const id = 'randomid';
    const expected = await service.update(id, update);
    const updatedUser = await controller.update(id, update);
    expect(updatedUser).toEqual(expected);
  });

  it('delete: should delete a user', () => {
    const spy = spyOn(service, 'delete');
    controller.delete('randomid');
    expect(spy).toBeCalled();
  });
});
