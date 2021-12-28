import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { UserService } from './services/user/user.service';
import { AdminService } from './services/admin/admin.service';

@Module({
  controllers: [PaymentController],
  providers: [UserService, AdminService]
})
export class PaymentModule {}
