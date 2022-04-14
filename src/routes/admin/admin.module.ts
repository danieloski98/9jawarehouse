import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { CrudService } from './services/crud/crud.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/Schema/Admin.Schema';
import { UserService } from './services/user/user.service';
import { NotificationsService } from './services/notifications/notifications.service';
import {
  NotificationSchema,
  Notification,
} from 'src/Schema/Notification.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Admin.name, schema: AdminSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [CrudService, UserService, NotificationsService],
})
export class AdminModule {}
