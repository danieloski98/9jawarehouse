import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Lga, LgaSchema } from 'src/Schema/Lga.Schema';
import { State, StateSchema } from 'src/Schema/State.Schema';
import { StatesController } from './states.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: State.name, schema: StateSchema },
      { name: Lga.name, schema: LgaSchema },
    ]),
  ],
  controllers: [StatesController],
})
export class StatesModule {}
