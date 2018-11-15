import { INestApplication } from '@nestjs/common';
import { Test }             from '@nestjs/testing';
import { getModelToken }    from '@nestjs/mongoose';

import { Request, Response }  from '../util/request';

import { AppModule }     from '../../src/app.module';
import { UserModelMock } from '../../src/components/user/user.model.mock';
import { UserCredentials } from '../../src/components/auth/types';

describe('Controller: User (e2e)', () => {
  let app: INestApplication;
  let model: UserModelMock;
  let credentials: UserCredentials;
  let request: Request;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ AppModule ],
    })
    .overrideProvider(getModelToken('User'))
    .useClass(UserModelMock)
    .compile();

    app = module.createNestApplication();
    await app.init();
    model = new UserModelMock();
    credentials = model.findOne();
    request = new Request(app, credentials);
    await request.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST)', async () => {
    const data = { name: 'Jaspion', email: 'jaspion@email.com', password: 'secret' };
    const response: Response = await request.private().post('/users').send(data);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(data);
  });

  it('/users (GET)', async () => {
    const expected = model.find();
    const response: Response = await request.private().get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expected);
  });

  it('/users/:id (GET)', async () => {
    const expected = model.findOne();
    const response: Response = await request.private().get('/users/randonid');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expected);
  });

  it('/users/:id (PUT)', async () => {
    const update = { name: 'Jaspion' };
    const expected = model.findOneAndUpdate({}, update);
    const response: Response = await request.private().put('/users/randomid').send(update);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(update);
    expect(response.body).toEqual(expected);
  });

  it('/users/:id (DELETE)', async () => {
    const response: Response = await request.private().delete('/users/randomid');
    expect(response.status).toBe(204);
  });
});
