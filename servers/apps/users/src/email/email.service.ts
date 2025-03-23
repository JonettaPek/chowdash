import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

type mailOptions = {
  recipientEmail: string;
  subject: string;
  template: string;
  name: string;
  activationCode: string;
};

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendAccountActivationEmail({
    recipientEmail,
    subject,
    template,
    name,
    activationCode,
  }: mailOptions) {
    await this.mailerService.sendMail({
      to: recipientEmail,
      subject,
      template,
      context: {
        name,
        activationCode,
      },
    });
  }
}
