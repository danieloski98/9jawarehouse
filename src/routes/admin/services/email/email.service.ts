import { Injectable, Logger } from '@nestjs/common';
import { IReturnObject } from 'src/utils/ReturnObject';
import { Return } from 'src/utils/Returnfunctions';
import { ContactForm } from 'src/Types/Contactform';
import * as nodemailer from 'nodemailer';
import * as Mg from 'nodemailer-mailgun-transport';
import { MailOptions } from 'nodemailer/lib/ses-transport';
import { sendCreationEmail } from 'src/templates/sendCreationMail';
import { sendResetLink } from 'src/templates/sendPasswordReset';
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
        from: process.env.COMPANY_EMAIL,
        to: body.email,
        subject: `Account creation Successful`,
        html: `<p> Your account has been created successfully ${body.email}. Here is your otp code for the verification of your account <b>${code}</b> </p>`,
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
        from: process.env.COMPANY_EMAIL,
        to: body.email,
        subject: `Password reset`,
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
        from: process.env.COMPANY_EMAIL,
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

  public async sendAcceptedEmail(
    email: string,
  ): Promise<IReturnObject> {
    try {
      const mailOption: MailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: email,
        subject: `Account Verification Failed`,
        html: `<p>Your account verification was successful. You can now login and set up your account  </p>`,
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
