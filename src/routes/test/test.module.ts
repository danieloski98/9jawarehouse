import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './services/test/test.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PINSchema, PIN } from 'src/Schema/PIN.Schema';
import { User, UserSchema } from 'src/Schema/User.schema';

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
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
