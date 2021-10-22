import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailList, EmailListSchema } from 'src/Schema/EmailList.Schema';
import { EmaillistController } from './emaillist.controller';
import { CrudService } from './services/crud/crud.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailList.name, schema: EmailListSchema },
    ]),
  ],
  controllers: [EmaillistController],
  providers: [CrudService],
})
export class EmaillistModule {}
