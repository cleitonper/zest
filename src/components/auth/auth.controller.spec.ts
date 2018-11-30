import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken }       from '@nestjs/mongoose';
import { JwtModule }           from '@nestjs/jwt';

import { UserModule }     from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService }    from './auth.service';
import { UserModelMock }  from '../../shared/mocks';
import { JwtStrategy }    from '../../shared/strategies';

describe('Controller: Auth', () => {
  let module: TestingModule;
  let controller: AuthController;
  let service: AuthService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ UserModule, JwtModule.register({}) ],
      providers: [ AuthService, JwtStrategy ],
      controllers: [ AuthController ],
    }).overrideProvider(getModelToken('User'))
    .useClass(UserModelMock)
    .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signin: should return a token', () => {
    const credentials = { email: 'user@email.com', password: 'secret' };
    const token = 'header.payload.signature';
    const expected = { token };
    spyOn(service, 'signin').and.returnValue(expected);
    expect(controller.signin(credentials)).resolves.toEqual(expected);
  });

});
