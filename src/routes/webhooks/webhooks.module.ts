import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/User.schema';
import { WebhooksController } from './webhooks.controller';
import { WebhooksService } from './webhooks.service';
import { EmailService } from 'src/routes/admin/services/email/email.service';
import { NotificationsModule } from 'src/routes/notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    NotificationsModule,
  ],
  controllers: [WebhooksController],
  providers: [WebhooksService, EmailService],
})
export class WebhooksModule {}
