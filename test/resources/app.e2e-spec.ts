import { INestApplication } from '@nestjs/common';
import { Test }             from '@nestjs/testing';

import { AppModule }   from '../../src/app.module';
import * as supertest  from 'supertest';
import {
  Test as Request,
  Response,
  SuperTest,
} from 'supertest';

describe('Controller: App (e2e)', () => {
  let app: INestApplication;
  let request: SuperTest<Request>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    request = supertest(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    const response: Response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        version: expect.any(String),
      }),
    );
  });
});
