import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NotificationSchema,
  NotificationDocument,
  Notification,
} from 'src/Schema/Notification.Schema';
import { IReturnObject } from 'src/utils/ReturnObject';
import { Return } from 'src/utils/Returnfunctions';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notiModel: Model<NotificationDocument>,
  ) {}

  async getAllNotifications(): Promise<IReturnObject> {
    try {
      const getNotis = await this.notiModel.find({ forAdmin: true });
      console.log(getNotis);
      return Return({
        error: false,
        statusCode: 200,
        data: getNotis,
        successMessage: 'Notifications',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 400,
        errorMessage: 'Password not acceptable',
      });
    }
  }

  async deleteNotification(_id: string): Promise<IReturnObject> {
    try {
      const getNotis = await this.notiModel.deleteOne({ _id });
      console.log(getNotis);
      return Return({
        error: false,
        statusCode: 200,
        data: getNotis,
        successMessage: 'Notification deleted',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 400,
        errorMessage: 'Password not acceptable',
      });
    }
  }
}
