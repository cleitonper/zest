import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken }       from '@nestjs/mongoose';
import { MailerProvider }      from '@nest-modules/mailer';
import { ConfigService }       from 'nestjs-config';

import {
  UserModelMock,
  ConfigServiceMock,
  MailerServiceMock,
} from '../../shared/mocks';

import { PasswordController } from './password.controller';
import { PasswordService }    from './password.service';
import { UserModule }         from '../user/user.module';
import { UserService } from '../user/user.service';

describe('Controller: Password', () => {
  let module: TestingModule;
  let controller: PasswordController;
  let service: PasswordService;
  let userService: UserService;
  let mailer: MailerProvider;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        UserModule,
      ],
      controllers: [
        PasswordController,
      ],
      providers: [
        PasswordService,
        { provide: ConfigService,  useClass: ConfigServiceMock },
        { provide: MailerProvider, useClass: MailerServiceMock },
      ],
    }).overrideProvider(getModelToken('User'))
    .useClass(UserModelMock)
    .compile();

    controller = module.get<PasswordController>(PasswordController);
    service = module.get<PasswordService>(PasswordService);
    userService = module.get<UserService>(UserService);
    mailer = module.get<MailerProvider>(MailerProvider);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('forgot: should call the service', async () => {
    const host = 'zest.com';
    const email = 'user@email.com';
    spyOn(service, 'forgot').and.returnValue(true);
    await controller.forgot(host, email);
    expect(service.forgot).toBeCalled();
  });

  it('reset: should return the token when its valid', () => {
    const response = { redirect: jest.fn() };
    const token = 'header.payload.signature';
    spyOn(service, 'validateResetPassToken').and.returnValue(true);
    expect(controller.reset(token, response))
    .resolves
    .toEqual(expect.objectContaining({
      token: expect.any(String),
    }));
  });

  it('reset: should return an error when the token is invalid', async () => {
    const response = { redirect: jest.fn() };
    const token = 'header.payload.signature';
    spyOn(service, 'validateResetPassToken').and.returnValue(false);
    await controller.reset(token, response);
    expect(response.redirect).toBeCalledWith('/reset-password/error');
  });

  it('change: should change the user password and show success page', async () => {
    const routeAfterChange = '/reset-password/success';
    const response = { redirect: jest.fn() };
    const body = { token: 'header.payload.signature', password: 'secret' };
    const user = { _id: 'reandomid' };

    spyOn(service, 'validateResetPassToken').and.returnValue(user);
    spyOn(userService, 'update');

    await controller.change(response, body);

    expect(userService.update).toBeCalledWith(user._id, { password: body.password });
    expect(response.redirect).toBeCalledWith(routeAfterChange);
  });

  it('change: should show error page when token is invalid', async () => {
    const routeAfterError = '/reset-password/error';
    const response = { redirect: jest.fn() };
    const body = { token: 'header.payload.signature', password: 'secret' };

    spyOn(service, 'validateResetPassToken').and.returnValue(false);

    await controller.change(response, body);

    expect(response.redirect).toBeCalledWith(routeAfterError);
  });

  it('error: should return title and message for error page', () => {
    expect(controller.error()).toEqual(
      expect.objectContaining({
        title: expect.any(String),
        message: expect.any(String),
      }),
    );
  });

  it('error: should return title and message for success page', () => {
    expect(controller.success()).toEqual(
      expect.objectContaining({
        title: expect.any(String),
        message: expect.any(String),
      }),
    );
  });
});
