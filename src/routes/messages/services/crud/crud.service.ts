import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailList, EmailListDocument } from 'src/Schema/EmailList.Schema';
import { Message, MessageDocument } from '../../../../Schema/Message.Schema';
// import { Message, MessageDocument } from 'src/schema/Message.Schema';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';

@Injectable()
export class CrudService {
  constructor(
    @InjectModel(EmailList.name)
    private emaillistRepo: Model<EmailListDocument>,
    @InjectModel(Message.name) private messagesRepo: Model<MessageDocument>,
  ) {}

  async createMessage(body: Message): Promise<IReturnObject> {
    try {
      // check if the email is part of the mailing list
      const isInList = await this.emaillistRepo.find({ email: body.email });
      if (isInList.length < 1) {
        // just create the message
        const newMsg = await this.messagesRepo.create(body);
        console.log(newMsg);
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Message Recieved',
        });
      } else {
        // add it to the mailing list
        const addToMailingList = await this.emaillistRepo.create({
          email: body.email,
        });
        console.log(addToMailingList);
        const newMsg = await this.messagesRepo.create(body);
        console.log(newMsg);
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Message Recieved',
        });
      }
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  async getAllMessages(): Promise<IReturnObject> {
    try {
      const allMsgs = await this.messagesRepo.find();
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Messages gotten',
        data: allMsgs,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }
}
