import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from 'src/Schema/User.schema';
import { CommentDocument, Comment } from 'src/Schema/Comment.Schema';
import {
  SubscriptionDocument,
  Subscription,
} from 'src/Schema/Subscriptions.Schema';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';
import { EmailService } from 'src/routes/admin/services/email/email.service';
import { RecordDocument, Record } from 'src/Schema/Record.Schema';
import { NotificationUserService } from 'src/routes/notifications/services/user/user.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
    @InjectModel(Record.name) private recordModel: Model<RecordDocument>,
    private emailService: EmailService,
    private notificationService: NotificationUserService,
  ) {}

  async getAllUser(): Promise<IReturnObject> {
    try {
      const users = await this.userModel.find();
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Users found',
        data: users,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async getAchUsers(): Promise<IReturnObject> {
    try {
      const users = await this.userModel.find({ disabled: true });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Users found',
        data: users,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async getAllUserByID(_id: string): Promise<IReturnObject> {
    try {
      const users = await this.userModel.findOne({ _id });
      const comments = await this.commentModel.find({ business_id: _id });
      const subscriptions = await this.subscriptionModel.find({
        business_id: _id,
      });

      const obj = {
        ...users['_doc'],
        subscriptions,
        comments,
      };
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Users found',
        data: obj,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async deleteUserByID(_id: string): Promise<IReturnObject> {
    try {
      const users = await this.userModel.deleteOne({ _id });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Users Deleted',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async approveUserByID(_id: string): Promise<IReturnObject> {
    try {
      const userEmail = await this.userModel.findById(_id);
      const user = await this.userModel.updateOne({ _id }, { blocked: false });
      const email = await this.emailService.sendAcceptedEmail(userEmail.email);
      console.log(email);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Users account enabled',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async arhUserByID(_id: string): Promise<IReturnObject> {
    try {
      const user = await this.userModel.updateOne({ _id }, { disabled: true });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Users account archived',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async unarhUserByID(_id: string): Promise<IReturnObject> {
    try {
      const user = await this.userModel.updateOne({ _id }, { disabled: false });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Users account unarchived',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async rejectUserByID(_id: string, msg: string): Promise<IReturnObject> {
    try {
      const user = await this.userModel.findById({ _id });
      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }
      // send rejection email
      const email = await this.emailService.sendRejectionEmail(user.email, msg);
      if (email.statusCode === 400) {
        return email;
      } else {
        return email;
      }
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Users account enabled',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async getAllRecords(): Promise<IReturnObject> {
    try {
      const records = await this.recordModel.find();
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'User records',
        data: records,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.///////',
      });
    }
  }

  async approveRecord(_id: string): Promise<IReturnObject> {
    try {
      const record = await this.recordModel.findOne({ _id });
      if (record === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Record not found!',
        });
      }
      const user = await this.userModel.findOne({ _id: record.user_id });
      if (user === null) {
        return Return({
          error: false,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }
      const newImagesTotal = [...record.images, ...user.pictures];
      let images;
      if (newImagesTotal.length > 5) {
        images = newImagesTotal.slice(0, 4);
      }
      const updateImage = await this.userModel.updateOne(
        { _id: user._id },
        { pictures: newImagesTotal.length > 5 ? images : newImagesTotal },
      );
      // send user Notification
      const userNoti = await this.notificationService.triggerNotification(
        user._id,
        'Images approved',
      );

      // send admin Notification
      const adminNoti = await this.notificationService.triggerAdminNotification(
        `Apporved images record create by user with email ${user.email}`,
      );
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'User records approved',
        data: record,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async rejectRecord(_id: string): Promise<IReturnObject> {
    try {
      const record = await this.recordModel.findOne({ _id });
      if (record === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Record not found!',
        });
      }
      const user = await this.userModel.findOne({ _id: record.user_id });
      if (user === null) {
        return Return({
          error: false,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }
      const deleteRec = await this.recordModel.deleteOne({ _id });
      // send user Notification
      const userNoti = await this.notificationService.triggerNotification(
        user._id,
        'Images record declined',
      );

      // send admin Notification
      const adminNoti = await this.notificationService.triggerAdminNotification(
        `Rejected an image record create by user with email ${user.email}`,
      );
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'User records approved',
        data: record,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }
}
