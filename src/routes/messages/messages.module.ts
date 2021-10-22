import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailList, EmailListSchema } from 'src/Schema/EmailList.Schema';
import { Message, MessageSchema } from 'src/Schema/Message.Schema';
import { MessagesController } from './messages.controller';
import { CrudService } from './services/crud/crud.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailList.name, schema: EmailListSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [MessagesController],
  providers: [CrudService],
})
export class MessagesModule {}
