import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/User.schema';
import {
  Subscription,
  SubscriptionSchema,
} from 'src/Schema/Subscriptions.Schema';
import { Comment, CommentSchema } from 'src/Schema/Comment.Schema';
import { AnalyticsController } from './analytics.controller';
import { GeneralService } from './services/general/general.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [GeneralService],
})
export class AnalyticsModule {}
