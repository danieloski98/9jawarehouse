import { Module } from '@nestjs/common';
import { VacinationController } from './vacination.controller';
import { VacinationService } from './services/vacination/vacination.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/User.schema';
import { Vacination, VacinationSchema } from 'src/Schema/Vacination.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Vacination.name,
        schema: VacinationSchema,
      },
    ]),
  ],
  controllers: [VacinationController],
  providers: [VacinationService],
})
export class VacinationModule {}
