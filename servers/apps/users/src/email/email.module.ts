import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
// import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get<string>('SMTP_HOST'),
          secure: true,
          auth: {
            user: config.get<string>('SMTP_MAIL'),
            pass: config.get<string>('SMTP_PASSWORD'),
          },
          defaults: {
            from: 'jonettapekk@gmail.com',
          },
          template: {
            dir: join(process.cwd(), 'apps/users/email-templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: false,
            },
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
})
export class EmailModule {}
