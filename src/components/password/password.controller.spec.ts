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

describe('Controller: Password', () => {
  let module: TestingModule;
  let controller: PasswordController;
  let service: PasswordService;
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
});
