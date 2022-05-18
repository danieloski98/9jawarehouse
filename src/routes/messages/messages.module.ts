import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { Service } from './.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/Schema/Message.Schema';
import { MessageService } from './message/message.service';
import { EmailService } from '../admin/services/email/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [MessagesController],
  providers: [Service, MessageService, EmailService],
})
export class MessagesModule {}
