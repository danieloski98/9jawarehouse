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
import { User as MongoUser, UserDocument } from 'src/Schema/User.schema';

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

  public async sendAcceptedEmail(email: string): Promise<IReturnObject> {
    try {
      const mailOption: MailOptions = {
        from: `9jaWarehouse Enterprise ${process.env.COMPANY_EMAIL}`,
        to: email,
        subject: `Account Verification Update`,
        html: `
          <div>
            <p>Hurray! Your account verification was SUCCESSFUL!!</p>

            <p>You can now return to the website (www.9jawarehouse.com) and login with your email and password and complete your details.</p>

            <p>You are one step closer to joining our community.</p>

            <p>We look forward to working with you and knowing more about you and your business. </p>

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
