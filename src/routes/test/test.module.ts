import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './services/test/test.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TestSchema, Test } from 'src/Schema/Test.Schema';
import { User, UserSchema } from 'src/Schema/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Test.name, schema: TestSchema },
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
