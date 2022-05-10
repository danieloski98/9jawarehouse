import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/Schema/User.schema';
import { ISubscriptionEvent } from './subscription.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { EmailService } from 'src/routes/admin/services/email/email.service';
import { NotificationUserService } from 'src/routes/notifications/services/user/user.service';

@Injectable()
export class WebhooksService {
  private logger = new Logger('WEBHOOKSERVICE');
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private emailService: EmailService,
    private schedulerRegistry: SchedulerRegistry,
    private notiService: NotificationUserService,
  ) {}
  async createCronJob(event: ISubscriptionEvent): Promise<any> {
    if (event.event === 'subscription.create') {
      // get the user first
      const user = await this.userModel.findOne({
        customer_code: event.data.customer.customer_code,
      });

      if (user === null || user === undefined) {
        return;
      }

      // send confrimation email
      await this.emailService.sendSubscriptionEmail(
        user.email,
        event.data.plan.name,
      );

      this.notiService.triggerAdminNotification(
        `A customer just made a ${event.data.plan.name}`,
      );
      this.notiService.triggerNotification(
        user._id,
        `Your ${event.data.plan.name} is now active, check your email adddress for instructions`,
      );

      // create cron job
      const job = new CronJob(event.data.cron_expression, async () => {
        // disabled user account
        const updatedUser = await this.userModel.update(
          { _id: user._id },
          {
            disabled: true,
            nextPayment: '',
          },
        );

        // send an email
        await this.emailService.sendSubscriptionExpiredEmail(user.email);
      });
      this.schedulerRegistry.addCronJob(
        `${user._id}-subscription termination`,
        job,
      );
      this.logger.log(`cron job created`);
      job.start();
      // update the Users nextPaymentDate
      const updateUser = await this.userModel.updateOne(
        { _id: user._id },
        {
          nextPayment: event.data.next_payment_date,
          disabled: false,
        },
      );
    }
  }
}
