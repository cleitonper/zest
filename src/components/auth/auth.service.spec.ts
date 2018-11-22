import { Test, TestingModule }   from '@nestjs/testing';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { getModelToken }         from '@nestjs/mongoose';

import { UserModule }    from '../user/user.module';
import { UserService }   from '../user/user.service';
import { UserModelMock } from '../user/user.model.mock';
import { AuthService }   from './auth.service';

describe('Service: Auth', () => {
  let service: AuthService;
  let userService: UserService;
  let jwt: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ UserModule, JwtModule.register({}) ],
      providers: [ AuthService ],
    }).overrideProvider(getModelToken('User'))
    .useClass(UserModelMock)
    .compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwt = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('signin: should return a token', () => {
    const credentials = { email: 'user@email.com', password: 'secret' };
    const token = 'header.payload.signature';
    const expected = { token };
    spyOn(jwt, 'sign').and.returnValue(token);
    expect(service.signin(credentials)).resolves.toEqual(expected);
  });

  it('signin: shoud throw an exception when email or password are empty', () => {
    const credentials = { email: '', password: '' };
    expect(service.signin(credentials)).rejects.toThrow(UnauthorizedException);
  });

  it('signin: should throw an exception when user is not found', () => {
    const credentials = { email: 'user@email.com', password: 'secret' };
    spyOn(userService, 'getByEmail').and.returnValue(null);
    expect(service.signin(credentials)).rejects.toThrow(UnauthorizedException);
  });

  it('signin: shoud throw an exception when password is invalid', () => {
    const credentials = { email: 'user@email.com', password: '!secret' };
    expect(service.signin(credentials)).rejects.toThrow(UnauthorizedException);
  });

  it('validate: should validate the user', () => {
    const credentials = { email: 'user@email.com', password: '!secret' };
    expect(service.validate(credentials)).resolves.toBeTruthy();
  });

  it('validate: should throw an exception when user is not found', () => {
    const credentials = { email: 'user@email.com', password: '!secret' };
    spyOn(userService, 'getByEmail').and.returnValue(null);
    expect(service.validate(credentials)).rejects.toThrow(UnauthorizedException);
  });
});
