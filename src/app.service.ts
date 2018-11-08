import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root() {
    return { name: 'Zest API', version: '1.0.0' };
  }
}
