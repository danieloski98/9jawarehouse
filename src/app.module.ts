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

console.log(process.env.SMTP_PORT);

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://danielemmanuel257:daniel98@ksih.iadjs.mongodb.net/passapp?retryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    ),
    AuthModule,
    UserModule,
    // AdminModule,
    // NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
