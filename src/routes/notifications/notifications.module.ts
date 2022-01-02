import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationUserService } from './services/user/user.service';
import { AdminService } from './services/admin/admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationSchema,
} from 'src/Schema/Notification.Schema';
import { User, UserSchema } from 'src/Schema/User.schema';
import { OtpGateway } from 'src/websockets/otp.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationUserService, AdminService, OtpGateway],
  exports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: User.name, schema: UserSchema },
    ]),
    OtpGateway,
    NotificationUserService,
  ],
})
export class NotificationsModule {}
