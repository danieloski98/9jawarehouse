import { Module } from '@nestjs/common';
import { EmailService } from '../admin/services/email/email.service';
import { AuthController } from './auth.controller';
import { UserService } from './services/user/user.service';
import { User as MongoUser, UserSchema } from '../../Schema/User.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CodeSchema, Code } from 'src/Schema/Code.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoUser.name, schema: UserSchema },
      { name: Code.name, schema: CodeSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [UserService, EmailService],
})
export class AuthModule {}
