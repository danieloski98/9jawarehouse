import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from 'src/Schema/Otp.schema';
import { User, UserSchema } from 'src/Schema/User.schema';
import { OtpGateway } from 'src/websockets/otp.gateway';
import { OtpController } from './otp.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Otp.name, schema: OtpSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [OtpController],
  providers: [OtpGateway],
})
export class OtpModule {}
