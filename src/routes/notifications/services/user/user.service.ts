import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Notification,
  NotificationDocument,
} from 'src/Schema/Notification.Schema';
import { User, UserDocument } from 'src/Schema/User.schema';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';
import { OtpGateway } from 'src/websockets/otp.gateway';

@Injectable()
export class NotificationUserService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private webSocket: OtpGateway,
  ) {}

  async getNotifications(business_id: string): Promise<IReturnObject> {
    try {
      const business = await this.userModel.findById(business_id);

      if (business === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }

      const notifications = await this.notificationModel.find({ business_id });
      return Return({
        error: false,
        statusCode: 200,
        successMessage:
          notifications.length > 0
            ? 'Notifications fetched'
            : 'You have no new notification',
        data: notifications,
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

  async markAsRead(_id: string): Promise<IReturnObject> {
    try {
      const notificationFound = await this.notificationModel.findById(_id);
      if (notificationFound === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Notification record not found',
        });
      }
      // update notification
      if (notificationFound.read) {
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Already ready',
        });
      } else {
        const update = await this.notificationModel.updateOne(
          { _id },
          { read: true },
        );
        console.log(update);
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Marked as Read',
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

  async deleteNotification(_id: string): Promise<IReturnObject> {
    try {
      const notificationFound = await this.notificationModel.findById(_id);
      if (notificationFound === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Notification record not found',
        });
      }
      const deleted = await this.notificationModel.deleteMany({ _id });
      console.log(deleted);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Deleted',
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

  async triggerNotification(
    business_id: string,
    message: string,
  ): Promise<IReturnObject> {
    try {
      const user = await this.userModel.findById(business_id);
      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }
      const newNotObj = {
        message,
        business_id,
      };
      const newNoti = await this.notificationModel.create(newNotObj);
      this.webSocket.server.emit(`NOTIFICATION:${business_id}`, newNoti);
      console.log(newNoti);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Notification Sent',
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

  async triggerAdminNotification(message: string): Promise<IReturnObject> {
    try {
      const newNotObj = {
        message,
        forAdmin: true,
      };
      const newNoti = await this.notificationModel.create(newNotObj);
      // this.webSocket.server.emit(`NOTIFICATION:${business_id}`, newNoti);
      console.log(newNoti);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Notification Sent',
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
