import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Comment } from 'src/Schema/Comment.Schema';
import { PIN, PINSchema } from 'src/Schema/PIN.Schema';
import { User, UserSchema } from 'src/Schema/User.schema';
import { OtpGateway } from 'src/websockets/otp.gateway';
import { NotificationsModule } from '../notifications/notifications.module';
import { PinService } from '../pin/services/pin/pin.service';
import { CommentsController } from './comments.controller';
import { CrudService } from './services/crud/crud.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: User.name, schema: UserSchema },
      { name: PIN.name, schema: PINSchema },
    ]),
    NotificationsModule,
  ],
  controllers: [CommentsController],
  providers: [CrudService, PinService, OtpGateway],
})
export class CommentsModule {}
