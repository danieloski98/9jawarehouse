import { Injectable, Logger } from '@nestjs/common';
import { IReturnObject } from 'src/utils/ReturnObject';
import { Return } from 'src/utils/Returnfunctions';
import { ContactForm } from 'src/Types/Contactform';
import * as nodemailer from 'nodemailer';
import * as Mg from 'nodemailer-mailgun-transport';
import { MailOptions } from 'nodemailer/lib/ses-transport';
import { sendSuccessEmail } from 'src/templates/Loanapplicationemail';
import { ApplicationSuccessful } from 'src/templates/ApplicationSuccessful';
import { ApplicationDeclined } from 'src/templates/ApplicationDeclined';
import { AdminLoanSuccess } from 'src/templates/AdminLoanSuccess';
import { User as MongoUser, User, UserDocument } from 'src/Schema/User.schema';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class EmailService {
  logger = new Logger();
  private auth = {
    auth: {
      api_key: process.env.EAZIKEY,
      domain: process.env.DOMAIN,
    },
  };

  private transporter = nodemailer.createTransport(Mg(this.auth));
  // private transporter = nodemailer.createTransport({
  //   host: 'smtp.mailgun.org',
  //   port: 25,
  //   secure: false,
  //   auth: {
  //     user: 'contact@support.eazicred.com',
  //     pass: process.env.MAILGUN_PASSWORD,
  //   },
  // });

  public async sendConfirmationEmail(
    body: UserDocument,
    code?: number,
  ): Promise<IReturnObject> {
    try {
      const mailOption: MailOptions = {
        from: `9jaWarehouse Enterprise ${process.env.COMPANY_EMAIL}`,
        to: body.email,
        subject: `Account Verification Code`,
        html: `<div> 
          <p>You are one step away from joining 9jaWarehouse community. Your verification code is below:</p>

        </br>
        <b>${code}</b>  </br>

        <p>Enter this verification code to verify your email.</p> </br>

        <p>Thank you for choosing 9jawarehouse Enterprise!</p> </br>

        <p>We are happy to have you onboard.</p> </br>

        <p>support@9jawarehouse.com</p>

        </div>`,
      };
      this.transporter.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return Return({
        error: false,
        successMessage: 'Account creation email sent',
        statusCode: 200,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      });
    }
  }

  public async sendSupportEmail(support: ContactForm): Promise<IReturnObject> {
    try {
      const mailOption: MailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: `eazicred@gmail.com`,
        subject: `Support form message from ${support.name}`,
        html: `<p>${support.message}</p>`,
      };
      const email = this.transporter.sendMail(
        mailOption,
        (error: any, info: any) => {
          if (error) {
            this.logger.error(error);
          } else {
            this.logger.log(info);
          }
        },
      );
      return Return({
        error: false,
        data: email,
        successMessage: 'Email sent',
        statusCode: 200,
      });
    } catch (error) {
      this.logger.error(error);
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      });
    }
  }

  public async sendResetEmail(
    body: MongoUser,
    code?: number,
  ): Promise<IReturnObject> {
    try {
      const mailOption: MailOptions = {
        from: `9jaWarehouse Enterprise ${process.env.COMPANY_EMAIL}`,
        to: body.email,
        subject: `Password reset code`,
        html: `<p>use the code ${code} </p>`,
      };
      this.transporter.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return Return({
        error: false,
        successMessage: 'Account creation email sent',
        statusCode: 200,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      });
    }
  }

  public async sendSuccessEmail(
    email: string,
    loanType: 'Payday Loan' | 'SME Loan',
  ): Promise<IReturnObject> {
    try {
      console.log(process.env.EMAIL);
      const mailOption: MailOptions = {
        from: 'eazicred@gmail.com',
        to: email,
        subject: `Loan Application`,
        html: sendSuccessEmail(loanType),
      };
      // const res = await this.mg.messages.create(
      //   'sandbox69ad51e92cf34635b7d8e6b3fb007014.mailgun.org',
      //   mailOption,
      // );
      // console.log(res);
      this.transporter.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          console.log(error);
          // this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });

      return Return({
        error: false,
        successMessage: 'Email Sent! to',
        statusCode: 200,
      });
    } catch (error) {
      console.log(error);
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      });
    }
  }

  public async sendAdminSuccessEmail(
    email: string,
    loan_id: string,
    loanType: 'Payday Loan' | 'SME Loan',
  ): Promise<IReturnObject> {
    try {
      const mailOption: MailOptions = {
        from: 'eazicred@gmail.com',
        to: 'eazicred@gmail.com',
        subject: `Loan Application`,
        html: AdminLoanSuccess(email, loan_id, loanType),
      };
      this.transporter.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          console.log(error);
          // this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return Return({
        error: false,
        successMessage: 'Email Sent!',
        statusCode: 200,
      });
    } catch (error) {
      console.log(error);
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      });
    }
  }

  public async sendGrantEmail(
    loan_id: string,
    email: string,
    loanType: 'Payday Loan' | 'SME Loan',
  ): Promise<IReturnObject> {
    try {
      const mailOption: MailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Loan Application`,
        html: ApplicationSuccessful(loan_id, loanType),
      };
      this.transporter.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          console.log(error);
          // this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return Return({
        error: false,
        successMessage: 'Email Sent!',
        statusCode: 200,
      });
    } catch (error) {
      console.log(error);
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      });
    }
  }

  public async sendDeclinedEmail(
    loan_id: string,
    email: string,
    loanType: 'Payday Loan' | 'SME Loan',
  ): Promise<IReturnObject> {
    try {
      const mailOption: MailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Loan Application`,
        html: ApplicationDeclined(loan_id, loanType),
      };
      this.transporter.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          console.log(error);
          // this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return Return({
        error: false,
        successMessage: 'Email Sent!',
        statusCode: 200,
      });
    } catch (error) {
      console.log(error);
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      });
    }
  }

  public async sendRejectionEmail(
    email: string,
    text: string,
  ): Promise<IReturnObject> {
    try {
      const mailOption: MailOptions = {
        from: `9jaWarehouse Enterprise ${process.env.COMPANY_EMAIL}`,
        to: email,
        subject: `Account Verification Failed`,
        html: `<p>Your account verification failed. 
        ${text} </p>`,
      };
      this.transporter.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return Return({
        error: false,
        successMessage: 'Account verification email sent',
        statusCode: 200,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      });
    }
  }

  public async sendAcceptedEmail(user: User): Promise<IReturnObject> {
    try {
      const mailOption: MailOptions = {
        from: `9jaWarehouse Enterprise ${process.env.COMPANY_EMAIL}`,
        to: user.email,
        subject: `Account Verification Update`,
        html: `
          <div>
            <p>Hello ${user.business_name}</p>

            <p>We are happy to see you join the 9jaWarehouse Enterprise business community. One of our goals is to help you grow and develop your business and skill set while also providing a platform that is searchable globally so your business can have a larger reach.</p>

            <p>
              <b>
                You are currently enrolled in the free sign up account. 9jaWarehouse offers a subscription based plan that can help your business. Below are the different subscriptions and their benefits: 
              </b>
            </p>

            <h4 style="margin-top: 20px; text-decoration: underline; font-weight: 500">Bronze Membership Subscription - #5,000 for one month</h4>

            <ol style="margin-top: 20px">
              <li>One post on Instagram per week</li>
              <li>One post on Facebook per week</li>
              <li>One reel on Instagram per week</li>
              <li>One post on Twitter</li>
              <li>One story per week</li>
              <li>Free next month subscription after bringing in 8 members</li>
            </ol>

            <h4 style="margin-top: 20px; text-decoration: underline; font-weight: 500">Silver Membership Subscription - #10,000 for three months</h4>

            <ol style="margin-top: 20px">
              <li>Two post on Instagram per week</li>
              <li>Two post on Facebook per week</li>
              <li>Two reels on Instagram per week</li>
              <li>Two stories on Instagram per week</li>
              <li>Two post on twitter</li>
              <li>One video post of Facebook and Instagram per week</li>
              <li>20% off subscription after bringing in 4 members</li>
              <li>Access to mentorship and business material, rebranding and sale strategies</li>
            </ol>

            <h4 style="margin-top: 20px; text-decoration: underline; font-weight: 500">Gold Membership Subscription - #20,000 for six months</h4>

            <ol style="margin-top: 20px">
              <li>Three post on Instagram per week</li>
              <li>Three post on Facebook per week</li>
              <li>Three reels on Instagram and Facebook per week</li>
              <li>Three stories on Instagram per week</li>
              <li>Three post on twitter</li>
              <li>Monthly Business Feature  on Instagram and Facebook</li>
              <li>Opportunity to go live on 9jawarehouse Instagram page to discuss business</li>
              <li>50% off subscription after bringing in 5 members</li>
              <li>Access to mentorship and business material, rebranding and sale strategies</li>
              <li>Opportunity to be selected for business funding * terms and conditions applies</li>
              <li>Two advertisements per month * when the app is released</li>
            </ol>

            <h5 style="margin-top: 20px; text-decoration: underline; font-weight: 300">Additional Perks:</h5>

            <ul style="margin-top: 20px">
              <li>Advertisement on our website page</li>
              <li>Chance to get featured in our monthly business of the week
              </li>
            </ul>

            <p>If you are interested in any of the subscriptions, reach out to us on: </p>

            <p>
              <b>Email: <a href="mailto:support@9jawarehouse.com">support@9jawarehouse.com</a></b>
            </p>

            <b>WhatsApp (Message Only): +447763417061</b>

            <p>Thank you,</p>
            <p>9jaWarehouse Enterprise Support Team.</p>

          </div>
        `,
      };
      this.transporter.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return Return({
        error: false,
        successMessage: 'Account verification email sent',
        statusCode: 200,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      });
    }
  }

  public async sendSubscriptionEmail(
    email: string,
    subType: string,
  ): Promise<IReturnObject> {
    try {
      const mailOption: MailOptions = {
        from: `9jaWarehouse Enterprise ${process.env.COMPANY_EMAIL}`,
        to: email,
        subject: `Subscription Successful`,
        html: `<p>Your ${subType} Membership Subscription was successful. <br>
        
        Fliers/pictures and content (write up including any preferred hash tags) for us to post for you. 9jaWarehouse Enterprise can also help with the hashtags that our branding team feels will reflect your business. This will come at an extra cost to be discussed with the branding team.

        <ol>
          <li>
          Bronze subscription will provide 4 different contents for the 4 weeks. Except if they wish to repeat the exact same advert for the 4 times. We accept that too.
          </li>

          <li>
          Silver subscription members will provide 8 different content ideas or if they wish, we repeat same content 8 times throughout the month.
          </li>

          <li>
          Gold subscription members will provide us with 12 different content ideas to post for them throughout the month.
          </li>
        </ol>

        <span>
          We can accept your content weekly. But must be submitted at most 8pm on Sunday against the new week.
        </span>
        
        </p>`,
      };
      this.transporter.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return Return({
        error: false,
        successMessage: 'Account verification email sent',
        statusCode: 200,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      });
    }
  }

  public async sendSubscriptionExpiredEmail(
    email: string,
  ): Promise<IReturnObject> {
    try {
      const mailOption: MailOptions = {
        from: `9jaWarehouse Enterprise ${process.env.COMPANY_EMAIL}`,
        to: email,
        subject: `Subscription Successful`,
        html: `<p>Your subscription has expired. please goto your dashboard and pick a subscription plan so you can be found by potential clients.
        </p>`,
      };
      this.transporter.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return Return({
        error: false,
        successMessage: 'Account verification email sent',
        statusCode: 200,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      });
    }
  }

  public async sendSupport(
    email: string,
    message: string,
  ): Promise<IReturnObject> {
    try {
      const mailOption: MailOptions = {
        from: `${email}`,
        to: `${process.env.COMPANY_EMAIL}`,
        subject: `Support Email`,
        html: `<p>
          ${message}
        </p>`,
      };
      this.transporter.sendMail(mailOption, (error: any, info: any) => {
        if (error) {
          this.logger.error(error);
        } else {
          this.logger.log(info);
        }
      });
      return Return({
        error: false,
        successMessage: 'Account verification email sent',
        statusCode: 200,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error',
      });
    }
  }
}
