// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get } from '@nestjs/common';
/*
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

*/
import {Post, Body } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Post('chat')
  handleChat(@Body() body: { message: string }) {
    return { reply: `Backend got: ${body.message}` };
  }
}
