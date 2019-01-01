import { Get, Controller } from '@nestjs/common';
import { ApiUseTags }      from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
@ApiUseTags('About')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root() {
    return this.appService.root();
  }
}
