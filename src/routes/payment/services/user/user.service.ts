import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/Schema/User.schema';
import { Model } from 'mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from 'src/Schema/Subscriptions.Schema';
import { IReturnObject } from 'src/utils/ReturnObject';
import { Return } from 'src/utils/Returnfunctions';
import { NotificationUserService as UserNotificationService } from 'src/routes/notifications/services/user/user.service';
import * as moment from 'moment';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class UserService {
  private INIT_URL = 'https://api.paystack.co/transaction/initialize';
  private VERIDY_URL = 'https://api.paystack.co/transaction/verify/';
  private logger = new Logger();
  constructor(
    private httpService: HttpService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
    private userNotificationService: UserNotificationService,
    private scheduleRegistry: SchedulerRegistry,
  ) {}

  async generateLink(
    _id: string,
    amount: number,
    query?: string,
  ): Promise<IReturnObject> {
    try {
      console.log(_id);
      const user = await this.userModel.findById(_id);
      console.log(user);
      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }
      const numq = parseInt(query);
      // create object payload
      const obj = {
        email: user.email,
        amount: amount * 100,
        currency: 'NGN',
        callback_url: process.env.URL,
        metadata: {
          fullname: `${user.first_name} ${user.last_name}`,
          phone: user.phone,
        },
        plan: numq === 1 ? process.env.PS_PLAN : process.env.PS_PLAN,
        channels: ['card', 'bank_transfer'],
      };
      // make request
      const request = await this.httpService
        .post(`${this.INIT_URL}`, obj, {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.PS_SECRET}`,
          },
        })
        .toPromise();
      if (request.status !== 200) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage:
            'An error occured while trying to generate the payment link',
          trace: request.data,
        });
      }
      // create subscription
      const currentDate = moment(new Date());
      const newSub = await this.subscriptionModel.create({
        reference_id: request.data.data.reference,
        access_code: request.data.data.access_code,
        business_id: user._id,
        amount,
        fullname: `${user.first_name} ${user.last_name}`,
        email: user.email,
        expires: currentDate.add(6, 'months').format('YYYY-MM-DD hh:mm'),
        status: 1,
      });
      console.log(newSub);
      // update User
      const updatedDate = moment(new Date());
      const userUpdate = await this.userModel.updateOne(
        { _id: user._id },
        {
          nextPayment: updatedDate.add(6, 'months').format('YYYY-MM-DD hh:mm'),
        },
      );
      // console.log(userUpdate);
      // console.log(numq);
      // // setup cron job
      // if (numq === 1) {
      //   (function () {
      //     const date = currentDate.add(1, 'month').format('YYYY-MM-DD');
      //     const datearr = date.split('-');
      //     const name = 'monthly sub';
      //     const job = new CronJob(`2 * * ${datearr[2]} ${datearr[1]} *`, () => {
      //       console.log(`time (2) for job ${name} to run!`);
      //     });
      //     this.schedulerRegistry.addCronJob(name, job);
      //     job.start();
      //     this.logger.warn(`job ${name} added for each minute at 1`);
      //   })();
      // }

      // if (numq > 1) {
      //   const caller = () => {
      //     const date = currentDate.add(5, 'months').format('YYYY-MM-DD');
      //     const datearr = date.split('-');
      //     console.log(datearr);
      //     const name = 'monthly sub';
      //     // const job = new CronJob(`1 * * * * *`, () => {
      //     //   console.log(`time (1) for job ${name} to run!`);
      //     // });
      //     const job = new CronJob(`* * * ${datearr[2]} ${datearr[1]} *`, () => {
      //       console.log(`time (2) for job ${name} to run!`);
      //     });
      //     this.scheduleRegistry.addCronJob(name, job);
      //     job.start();
      //     console.log(`job ${name} added for each minute at 1`);
      //   };
      //   caller();
      // }
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Payment link generated',
        data: request.data.data,
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

  async verifyPayment(reference: string): Promise<IReturnObject> {
    try {
      const sub = await this.subscriptionModel.findOne({
        reference_id: reference,
      });

      if (sub === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Payment not found',
        });
      }

      const request = await this.httpService
        .get(`${this.VERIDY_URL}${reference}`, {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.PS_SECRET}`,
          },
        })
        .toPromise();

      if (request.data.data.status !== 'success') {
        this.userNotificationService.triggerNotification(
          sub.business_id,
          'Your subscription payment failed. Please try again or contact support',
        );
        const markDeclined = await this.subscriptionModel.updateOne(
          { _id: sub._id },
          { status: 3 },
        );
        console.log(markDeclined);
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: request.data.data.gateway_response,
        });
      }
      const markDeclined = await this.subscriptionModel.updateOne(
        { _id: sub._id },
        { status: 2 },
      );
      const userEnabled = await this.userModel.updateOne(
        { _id: sub.business_id },
        { disabled: false },
      );
      console.log(userEnabled);
      // console.log(markDeclined);
      this.userNotificationService.triggerNotification(
        sub.business_id,
        'Your subscription payment was successful',
      );
      return Return({
        error: true,
        statusCode: 200,
        successMessage: request.data.data.gateway_response,
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

  async getAllSubs(_id: string): Promise<IReturnObject> {
    try {
      console.log(_id);
      const subs = await this.subscriptionModel.find({ business_id: _id });
      console.log(subs);
      return Return({
        error: false,
        statusCode: 200,
        data: subs,
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

  async getSubs(): Promise<IReturnObject> {
    try {
      const subs = await this.subscriptionModel.find();
      return Return({
        error: false,
        statusCode: 200,
        data: subs,
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
