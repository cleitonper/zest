import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService }    from './app.service';

describe('Contrller: App', () => {
  let app: TestingModule;
  let controller: AppController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ AppController ],
      providers: [ AppService ],
    }).compile();

    controller = app.get<AppController>(AppController);
  });

  it('should return API name and version', () => {
    expect(controller.root()).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        version: expect.any(String),
      }),
    );
  });
});
