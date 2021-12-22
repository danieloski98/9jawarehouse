import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CrudService } from './services/crud/crud.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/User.schema';
import { Vacination, VacinationSchema } from 'src/Schema/Vacination.Schema';
import { PIN, PINSchema } from 'src/Schema/PIN.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Vacination.name, schema: VacinationSchema },
      { name: PIN.name, schema: PINSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [CrudService],
})
export class UserModule {}
