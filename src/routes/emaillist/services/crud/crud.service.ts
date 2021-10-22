import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailList, EmailListDocument } from 'src/Schema/EmailList.Schema';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';

@Injectable()
export class CrudService {
  constructor(
    @InjectModel(EmailList.name)
    private emaillistRepo: Model<EmailListDocument>,
  ) {}

  // register email
  async registerEmail(email: string): Promise<IReturnObject> {
    try {
      // check for the email first
      const exists = await this.emaillistRepo.find({ email });
      if (exists.length > 0) {
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Email Stored',
        });
      }
      const newEmail = await this.emaillistRepo.create({ email });
      console.log(newEmail);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Email Stored',
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

  async getEmails(): Promise<IReturnObject> {
    try {
      // check for the email first
      const exists = await this.emaillistRepo.find();
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Email list',
        data: exists,
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
