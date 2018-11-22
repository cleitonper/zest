import { INestApplication } from '@nestjs/common';
import { Test }             from '@nestjs/testing';
import { getModelToken }    from '@nestjs/mongoose';
import { JwtService, JwtModule } from '@nestjs/jwt';

import { Request, Response } from '../util/request';

import { AppModule }     from '../../src/app.module';
import { UserModelMock } from '../../src/components/user/user.model.mock';

describe('Controller: Auth (e2e)', () => {
  let app: INestApplication;
  let request: Request;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ AppModule, JwtModule.register({}) ],
    })
    .overrideProvider(getModelToken('User'))
    .useClass(UserModelMock)
    .compile();

    app = module.createNestApplication();
    await app.init();
    request = new Request(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/sign (POST)', async () => {
    const credentials = { email: 'user@email.com', password: 'secret' };
    const response: Response = await request.public().post('/signin').send(credentials);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      token: expect.any(String),
    }));
  });
});