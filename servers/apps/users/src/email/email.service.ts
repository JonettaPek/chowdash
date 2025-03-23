import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import hbs from 'handlebars';
import { join } from 'path';

type mailOptions = {
  recipientEmail: string;
  subject: string;
  // template: string;
  name: string;
  activationCode: string;
};

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendAccountActivationEmail({
    recipientEmail,
    subject,
    // template,
    name,
    activationCode,
  }: mailOptions) {
    const templateSource = readFileSync(
      join(process.cwd(), 'apps/users/email-templates/account-activation.hbs'),
      'utf-8',
    );
    const accountActivationTemplate = hbs.compile(templateSource);

    await this.mailerService.sendMail({
      to: recipientEmail,
      subject,
      html: accountActivationTemplate({
        name,
        activationCode,
      }),
      // context: {
      //   name,
      //   activationCode,
      // },
    });
  }
}
