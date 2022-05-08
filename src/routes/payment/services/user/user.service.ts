import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/Schema/User.schema';
import triggerEvent from 'src/Eventemitters/Payment.event';
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
import { EmailService } from 'src/routes/admin/services/email/email.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class UserService {
  private INIT_URL = 'https://api.paystack.co/transaction/initialize';
  private VERIDY_URL = 'https://api.paystack.co/transaction/verify/';

  // keys based on the enviroment
  private PLAN1 =
    process.env.NODE_ENV === 'development'
      ? process.env.PSL_PLAN
      : process.env.PS_PLAN;
  private PLAN3 =
    process.env.NODE_ENV === 'development'
      ? process.env.PSL_PLAN_2
      : process.env.PS_PLAN_2;
  private PLAN6 =
    process.env.NODE_ENV === 'development'
      ? process.env.PSL_PLAN_3
      : process.env.PS_PLAN_3;
  private logger = new Logger();
  constructor(
    private httpService: HttpService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
    private userNotificationService: UserNotificationService,
    private scheduleRegistry: SchedulerRegistry,
    private emailService: EmailService,
  ) {}

  async generateLink(
    _id: string,
    amount: number,
    query?: string,
  ): Promise<IReturnObject> {
    try {
      const user = await this.userModel.findById(_id);
      console.log(query);
      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }
      const numq = parseInt(query);
      const plan = (pln: number) => {
        switch (pln) {
          case 1: {
            console.log(this.PLAN1);
            return this.PLAN1;
          }
          case 2: {
            console.log(this.PLAN3);
            return this.PLAN3;
          }
          case 3: {
            console.log(this.PLAN6);
            return this.PLAN6;
          }
        }
      };
      //create object payload
      const obj = {
        email: user.email,
        amount: amount * 100,
        currency: 'NGN',
        bearer: 'account',
        callback_url: 'https://9jawarehouse.vercel.app/verifypayment',
        metadata: {
          fullname: `${user.first_name} ${user.last_name}`,
          phone: user.phone,
        },
        plan: plan(numq),
        channels: ['card'],
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
      const nextdate = (num: number, dateobj) => {
        switch (num) {
          case 1: {
            return dateobj.add(1, 'months').format('YYYY-MM-DD hh:mm');
            break;
          }
          case 2: {
            return dateobj.add(3, 'months').format('YYYY-MM-DD hh:mm');
            break;
          }
          case 3: {
            return dateobj.add(6, 'months').format('YYYY-MM-DD hh:mm');
            break;
          }
        }
      };
      const currentDate = moment(new Date());
      const newSub = await this.subscriptionModel.create({
        reference_id: request.data.data.reference,
        access_code: request.data.data.access_code,
        business_id: user._id,
        amount,
        fullname: `${user.first_name} ${user.last_name}`,
        email: user.email,
        expires: nextdate(numq, currentDate),
        status: 1,
      });
      console.log(newSub);
      // update User
      const updatedDate = moment(new Date());
      const userUpdate = await this.userModel.updateOne(
        { _id: user._id },
        {
          nextPayment: nextdate(numq, updatedDate),
        },
      );

      switch (numq) {
        case 1: {
          triggerEvent('1 Month Plan', user);
          this.emailService.sendSubscriptionEmail(user.email, '1 month plan');
          break;
        }
        case 2: {
          this.emailService.sendSubscriptionEmail(user.email, '3 months plan');
          triggerEvent('3 Months Plan', user);
          break;
        }
        case 3: {
          this.emailService.sendSubscriptionEmail(user.email, '6 months plan');
          triggerEvent('6 Months Plan', user);
          break;
        }
      }

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Payment link generated',
        data: request.data.data,
      });
    } catch (error) {
      console.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: `Internal Server Error`,
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
