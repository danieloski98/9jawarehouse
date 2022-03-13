import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CrudService } from './services/crud/crud.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/User.schema';
import { Vacination, VacinationSchema } from 'src/Schema/Vacination.Schema';
import { PIN, PINSchema } from 'src/Schema/PIN.Schema';
import { Picture, PictureSchema } from 'src/Schema/Pictures.Schema';
import { ProfilePic, ProfilePicSchema } from 'src/Schema/ProfilePic.Schema';
import { PicsService } from './services/pics/pics.service';
import { Record, RecordSchema } from 'src/Schema/Record.Schema';
import { CommentSchema, Comment } from 'src/Schema/Comment.Schema';
import { AdminService } from './services/admin/admin.service';
import { Subscription, SubscriptionSchema } from 'src/Schema/Subscriptions.Schema';
import { EmailService } from '../admin/services/email/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Vacination.name, schema: VacinationSchema },
      { name: PIN.name, schema: PINSchema },
      { name: Picture.name, schema: PictureSchema },
      { name: ProfilePic.name, schema: ProfilePicSchema },
      { name: Record.name, schema: RecordSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [CrudService, PicsService, AdminService, EmailService],
})
export class UserModule {}
