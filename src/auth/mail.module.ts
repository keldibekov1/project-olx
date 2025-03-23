import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-password',
        },
      },
    }),
  ],
  exports: [MailerModule],
})
export class MailModule {}
