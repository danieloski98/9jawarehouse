import { Module } from '@nestjs/common';
import { PinController } from './pin.controller';
import { PinService } from './services/pin/pin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PINSchema, PIN } from 'src/Schema/PIN.Schema';
import { User, UserSchema } from 'src/Schema/User.schema';
import { OtpGateway } from 'src/websockets/otp.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PIN.name, schema: PINSchema },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [PinController],
  providers: [PinService, OtpGateway],
})
export class PinModule {}
