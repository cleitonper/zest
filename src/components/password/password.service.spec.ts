import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException }   from '@nestjs/common';
import { getModelToken }       from '@nestjs/mongoose';
import { MailerProvider }      from '@nest-modules/mailer';
import { ConfigService }       from 'nestjs-config';
import * as jwt                from 'jsonwebtoken';

import {
  UserModelMock,
  ConfigServiceMock,
  MailerServiceMock,
} from '../../shared/mocks';

import { PasswordService } from './password.service';
import { UserModule }      from '../user/user.module';
import { UserService }     from '../user/user.service';
import { User }            from '../user/types';

describe('Service: Password', () => {
  let service: PasswordService;
  let userService: UserService;
  let userModel: UserModelMock;
  let mailer: MailerProvider;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
      ],
      providers: [
        PasswordService,
        { provide: ConfigService,  useClass: ConfigServiceMock },
        { provide: MailerProvider, useClass: MailerServiceMock },
      ],
    }).overrideProvider(getModelToken('User'))
    .useClass(UserModelMock)
    .compile();

    service = module.get<PasswordService>(PasswordService);
    userService = module.get<UserService>(UserService);
    userModel = new UserModelMock();
    mailer = module.get<MailerProvider>(MailerProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('forgot: should send an email to user', async () => {
    const user: User = userModel.findOne();
    const resetPassAddr = 'http://zest.com/forgot-password';
    const token = 'header.payload.signature';
    const { email } = user;

    spyOn(userService, 'getByEmail').and.returnValue(user);
    spyOn(jwt, 'sign').and.returnValue(token);
    spyOn(mailer, 'sendMail').and.returnValue(true);

    await service.forgot(email, resetPassAddr);

    expect(mailer.sendMail).toBeCalled();
  });

  it('forgot: should return a NotFoundException when user is not found', async () => {
    const email = 'invalid@email.com';
    const resetPassAddr = 'http://zest.com/forgot-password';

    spyOn(userService, 'getByEmail').and.returnValue(null);

    expect(service.forgot(email, resetPassAddr))
      .rejects
      .toThrowError(NotFoundException);
  });

  it('validateResetPassToken: should return true to valid token', () => {
    const user = userModel.findOne();
    const token = 'header.payload.signature';

    spyOn(jwt, 'decode').and.returnValue(user);
    spyOn(jwt, 'verify').and.returnValue(user);

    expect(service.validateResetPassToken(token)).resolves.toBeTruthy();
  });

  it('validateResetPassToken: should return false when do not have a token payload', () => {
    const token = 'header.payload.signature';
    spyOn(jwt, 'decode').and.returnValue(null);
    expect(service.validateResetPassToken(token)).resolves.toBeFalsy();
  });

  it('validateResetPassToken: should return false when no user found', () => {
    const token = 'header.payload.signature';
    spyOn(userService, 'get').and.returnValue(null);
    expect(service.validateResetPassToken(token)).resolves.toBeFalsy();
  });

  it('validateResetPassToken: should return false when has an invalid token', () => {
    const user = userModel.findOne();
    const token = 'header.payload.signature';

    spyOn(jwt, 'decode').and.returnValue(user);
    spyOn(jwt, 'verify').and.throwError('InvalidTokenError');

    expect(service.validateResetPassToken(token)).resolves.toBeFalsy();
  });
});
