import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class TemplateController {
  @Get('/test-template')
  @Render('account-activation')
  testTemplate() {
    return { name: 'John', activationCode: '1234' };
  }
}
