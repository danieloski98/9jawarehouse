import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from 'src/Schema/Otp.schema';
import { Test, TestSchema } from 'src/Schema/Test.Schema';
import { User, UserSchema } from 'src/Schema/User.schema';
import { Vacination, VacinationSchema } from 'src/Schema/Vacination.Schema';
import { OtpGateway } from 'src/websockets/otp.gateway';
import { CrudService } from '../user/services/crud/crud.service';
import { OtpController } from './otp.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Otp.name, schema: OtpSchema },
      { name: User.name, schema: UserSchema },
      { name: Vacination.name, schema: VacinationSchema },
      { name: Test.name, schema: TestSchema },
    ]),
  ],
  controllers: [OtpController],
  providers: [OtpGateway, CrudService],
})
export class OtpModule {}
