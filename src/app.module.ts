import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './routes/auth/auth.module';

// import { AdminModule } from './routes/admin/admin.module';
// import { NotificationsModule } from './routes/notifications/notifications.module';
import { EmailService } from './globalservices/email/email.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './routes/user/user.module';
import { OtpGateway } from './websockets/otp.gateway';
import { EmaillistModule } from './routes/emaillist/emaillist.module';
import { ServicesModule } from './routes/services/services.module';
import { CommentsModule } from './routes/comments/comments.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

console.log(process.env.COMPANY_EMAIL);
const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.LOCAL_DB
    : process.env.DB_URL;

@Module({
  imports: [
    MongooseModule.forRoot(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    AuthModule,
    UserModule,
    EmaillistModule,
    ServicesModule,
    CommentsModule,
    // AdminModule,
    // NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService, OtpGateway],
})
export class AppModule {}
