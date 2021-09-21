import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './routes/auth/auth.module';

// import { AdminModule } from './routes/admin/admin.module';
// import { NotificationsModule } from './routes/notifications/notifications.module';
import { EmailService } from './globalservices/email/email.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './routes/user/user.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

console.log(process.env.COMPANY_EMAIL);

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    AuthModule,
    UserModule,
    // AdminModule,
    // NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
