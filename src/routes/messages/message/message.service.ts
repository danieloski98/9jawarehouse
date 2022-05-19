import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from 'src/routes/admin/services/email/email.service';
import { Message, MessageDocument } from 'src/Schema/Message.Schema';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private emailService: EmailService,
  ) {}

  async createMessage(message: Message): Promise<IReturnObject> {
    try {
      const msg = await this.messageModel.create(message);
      const emailSent = await this.emailService.sendSupport(
        message.email,
        message.message,
      );

      console.log(emailSent);
      return Return({
        error: false,
        statusCode: 200,
        successMessage:
          'Message has been sent. We are working on it and will respond within 24 hours.',
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
