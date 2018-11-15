import { INestApplication } from '@nestjs/common';

import * as defaults   from 'superagent-defaults';
import * as supertest  from 'supertest';
import {
  Test as SuperagentRequest,
  Response,
  SuperTest,
} from 'supertest';

import { UserCredentials } from '../../src/components/auth/types';

const DEFAUL_CREDENTIALS = { email: 'lorem@email.com', password: 'secret' };

class Request {
  private publicRequest;
  private privateRequest;
  private credentials: UserCredentials;
  private token: string;

  constructor(app: INestApplication, credentials: UserCredentials = DEFAUL_CREDENTIALS) {
    this.publicRequest = supertest(app.getHttpServer());
    this.privateRequest = defaults(supertest(app.getHttpServer()));
    this.credentials = credentials;
  }

  async init() {
    if (!this.token) {
      const response: Response = await this.publicRequest
        .post('/signin')
        .send(this.credentials);

      const { token } = response.body;

      this.privateRequest.set('Authorization', `Bearer ${token}`);
      this.token = token;
    }
  }

  public(): SuperTest<SuperagentRequest> {
    return this.publicRequest;
  }

  private(): SuperTest<SuperagentRequest> {
    if (!this.token) {
      throw new Error('Request: You need to call init method before to send private requests');
    }

    return this.privateRequest;
  }
}

export {
  Request,
  Response,
};