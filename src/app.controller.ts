import { Controller, Get } from '@nestjs/common';

@Controller('/v1')
export class AppController {
  constructor() {}

  @Get('/health')
  getHello() {
    return { 
      status: 'ok' ,
      message: 'secure-file-upload is up and running'
    };
  }
}
