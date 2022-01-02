import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { UserService } from './services/user/user.service';
import { AdminService } from './services/admin/admin.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/User.schema';
import {
  Subscription,
  SubscriptionSchema,
} from 'src/Schema/Subscriptions.Schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [UserService, AdminService],
})
export class PaymentModule {}
