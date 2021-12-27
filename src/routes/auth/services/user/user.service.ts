/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';
import { sign } from 'jsonwebtoken';
import { compare, compareSync, genSaltSync, hash } from 'bcrypt';
import { EmailService } from 'src/routes/admin/services/email/email.service';
import { InjectModel } from '@nestjs/mongoose';
import { User as MongoUser, UserDocument } from 'src/Schema/User.schema';
import { Model } from 'mongoose';
import { Code, CodeDocument } from 'src/Schema/Code.Schema';
import {
  ForgotPasswordDocument,
  ForgotPasswordOTP,
} from 'src/Schema/ForgotPasswordOTP';
import { ResetPassword } from '../../auth.controller';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomNumber = require('random-number');
require('dotenv').config();

@Injectable()
export class UserService {
  private logger = new Logger();
  constructor(
    private emailService: EmailService,
    @InjectModel(MongoUser.name) private userModel: Model<UserDocument>,
    @InjectModel(Code.name) private codeModel: Model<CodeDocument>,
    @InjectModel(ForgotPasswordOTP.name)
    private FPModal: Model<ForgotPasswordDocument>,
  ) {}

  async createAccount(userDetails: MongoUser): Promise<IReturnObject> {
    try {
      // check if there is an account with that email
      this.logger.log(userDetails);

      const emailInUse = await this.userModel.find({
        email: userDetails.email.toLowerCase(),
      });

      const username = await this.userModel.find({
        username: userDetails.username.toLowerCase(),
      });

      if (emailInUse.length >= 1) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Email already in use',
        });
      }

      if (username.length >= 1) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'username already in use',
        });
      }

      // check password
      if (userDetails.password.length < 8) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Password not acceptable',
        });
      }

      // hash the password
      const newPassword = userDetails.passwordless
        ? null
        : await this.generateHashedPassword(userDetails.password);
      // send email
      // construct new user
      const newUser = userDetails.passwordless
        ? {
            email: userDetails.email.toLowerCase(),
            username: userDetails.username.toLowerCase(),
            phone: userDetails.phone,
          }
        : {
            email: userDetails.email.toLowerCase(),
            username: userDetails.username.toLowerCase(),
            password: newPassword,
            phone: userDetails.phone,
          };

      // create the record
      const savedUser = await this.userModel.create(newUser);
      // const savedUser = new this.userModel(newUser);
      // savedUser.save();
      delete savedUser.password;

      // generate code
      const options = {
        min: 100000,
        max: 199999,
        integer: true,
      };
      const code = randomNumber(options);
      const newCode = await this.codeModel.create({
        user_id: savedUser._id,
        code,
      });

      this.logger.log(newCode);

      //send email
      const sentEmail = await this.emailService.sendConfirmationEmail(
        savedUser,
        code,
      );

      // delete code after 5mins
      const timeout = setTimeout(async () => {
        const deletedCode = await this.FPModal.deleteOne({ code });
        clearTimeout(timeout);
      }, 5000 * 60);

      this.logger.log(sentEmail);

      if (sentEmail.error) {
        const sentEmail = await this.emailService.sendConfirmationEmail(
          savedUser,
          code,
        );
      }

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Account created',
        data: savedUser,
      });
    } catch (error) {
      this.logger.log(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error occured',
        trace: error,
      });
    }
  }

  public async loginUser(
    payload: Partial<UserDocument>,
  ): Promise<IReturnObject> {
    try {
      // check if an account with the email exisits
      const accountExisit = await this.userModel
        .findOne({
          email: payload.email,
        })
        .exec();
      console.log(accountExisit);
      if (accountExisit === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Account not found.',
        });
      }

      if (accountExisit.passwordless) {
        // generate jwt
        payload['id'] = accountExisit._id;
        this.logger.warn(typeof accountExisit);
        const jwt = await this.generateJWT(payload);
        delete accountExisit.password;
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Login successful',
          data: {
            token: jwt,
            user: accountExisit,
          },
        });
      } else {
        // verify the password
        const existingPassword = accountExisit.password;
        const passwordMatch = compareSync(payload.password, existingPassword);

        if (!passwordMatch) {
          return Return({
            error: true,
            statusCode: 400,
            errorMessage: 'Invalid email or password.',
          });
        } else {
          // generate jwt
          payload['id'] = accountExisit._id;
          this.logger.warn(typeof accountExisit);
          const jwt = await this.generateJWT(payload);
          delete accountExisit.password;
          return Return({
            error: false,
            statusCode: 200,
            successMessage: 'Login successful',
            data: {
              token: jwt,
              user: accountExisit,
            },
          });
        }
      }
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async changePassword(
    user_id: string,
    payload: { oldpassword: string; newpassword: string },
  ): Promise<IReturnObject> {
    try {
      // check if the user does exist
      const userExist = await this.userModel.findOne({ _id: user_id });
      if (userExist === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      } else {
        console.log(payload);
        // check the old password
        const passwordCheck = await compare(
          payload.oldpassword,
          userExist.password,
        );
        const samePassword = await compare(
          payload.newpassword,
          userExist.password,
        );

        if (!passwordCheck) {
          return Return({
            error: true,
            statusCode: 400,
            errorMessage: 'Old Password does not match',
          });
        } else if (samePassword) {
          return Return({
            error: true,
            statusCode: 400,
            errorMessage: "You can't use an old password",
          });
        } else if (payload.newpassword.length < 8) {
          return Return({
            error: true,
            statusCode: 400,
            errorMessage:
              'Invalid password, password should be upto 8 alphanumeric characters.',
          });
        } else {
          // hash the new Password
          const hash = await this.generateHashedPassword(payload.newpassword);

          const updatedUser = await this.userModel.updateOne(
            { _id: userExist._id },
            { password: hash },
          );
          this.logger.log(updatedUser);
          return Return({
            error: false,
            statusCode: 200,
            successMessage: 'Password updated',
          });
        }
      }
    } catch (error) {
      console.log(error);
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  // verify user
  async verifyUser(id: string, code?: number): Promise<IReturnObject> {
    try {
      const Existingcode = await this.codeModel.findOne({ code });
      if (Existingcode !== null) {
        // check the code
        if (Existingcode.user_id !== id) {
          return Return({
            error: true,
            statusCode: 400,
            errorMessage: 'Invalid Code',
          });
        }
        // verify the users account
        const updateUser = await this.userModel
          .updateOne({ _id: Existingcode.user_id }, { verified: true })
          .exec();
        // delete the code
        const deleteCode = await this.codeModel.deleteOne({
          _id: Existingcode._id,
        });

        // get the user
        const user = await this.userModel.findOne({
          _id: Existingcode.user_id,
        });

        const token = await this.generateJWT({
          email: user.email,
          password: user.password,
          _id: user._id,
        });
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Account Verified',
          data: {
            token,
            user,
          },
        });
      } else {
        return Return({
          error: true,
          statusCode: 400,
          successMessage: 'code not found',
        });
      }
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  // forgot password
  async forgotpassword(email: string): Promise<IReturnObject> {
    try {
      const account = await this.userModel.findOne({ email });
      if (account === undefined || account === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Email not found',
        });
      } else {
        // generate code
        // generate code
        const options = {
          min: 1000,
          max: 1999,
          integer: true,
        };
        const code = randomNumber(options);
        const newCode = await this.FPModal.create({
          code,
          user_id: account._id,
        });
        console.log(code);
        // send the email
        this.emailService.sendResetEmail(account, code);
        // delete code after 5mins
        const timeout = setTimeout(async () => {
          const deletedCode = await this.FPModal.deleteOne({ code });
          clearTimeout(timeout);
        }, 5000 * 60);
        return Return({
          error: false,
          statusCode: 200,
          successMessage: `if an account exist with email ${email} an OTP code has been sent to it`,
        });
      }
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async resetPassword(
    otp: number,
    passwords: ResetPassword,
  ): Promise<IReturnObject> {
    try {
      // check the code
      const code = await this.FPModal.findOne({ code: otp });
      if (code === null || code === undefined) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Invalid Code',
        });
      }

      const user = await this.userModel.findOne({ _id: code.user_id });
      if (user === undefined || user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Account not found',
        });
      }

      // check password
      if (passwords.newpassword !== passwords.confirmpassword) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Passwords do not match',
        });
      }

      // hash the password
      const hash = await this.generateHashedPassword(passwords.confirmpassword);

      // update the users password
      const updatedPassword = await this.userModel.updateOne(
        { _id: code.user_id },
        { password: hash },
      );

      this.logger.log(updatedPassword);

      // delete the code
      const deletedCode = await this.FPModal.deleteOne({ code: otp });

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Password changed',
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

  async getUserByID(id: string): Promise<IReturnObject> {
    try {
      const user = await this.userModel.findOne({ _id: id });
      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      } else {
        delete user._id;
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'User found',
          data: user,
        });
      }
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  public async resendVerificationCode(_id: string): Promise<IReturnObject> {
    try {
      // check email
      const accountExist = await this.userModel.findOne({ _id });
      if (accountExist === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Account not found',
        });
      }

      // generate code
      const options = {
        min: 1000,
        max: 1999,
        integer: true,
      };
      const code = randomNumber(options);
      const newCode = await this.codeModel.create({
        user_id: accountExist._id,
        code,
      });

      this.logger.log(newCode);

      //send email
      const sentEmail = await this.emailService.sendConfirmationEmail(
        accountExist,
        code,
      );

      // delete code after 5mins
      const timeout = setTimeout(async () => {
        const deletedCode = await this.FPModal.deleteOne({ code });
        clearTimeout(timeout);
      }, 5000 * 60);

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Code Sent, Check your mail',
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

  public async resendResetCode(email: string): Promise<IReturnObject> {
    try {
      // check email
      const accountExist = await this.userModel.findOne({ email });
      if (accountExist === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Account not found',
        });
      }

      // generate code
      const options = {
        min: 1000,
        max: 1999,
        integer: true,
      };
      const code = randomNumber(options);
      const newCode = await this.FPModal.create({
        user_id: accountExist._id,
        code,
      });

      this.logger.log(newCode);

      //send email
      const sentEmail = await this.emailService.sendResetEmail(
        accountExist,
        code,
      );

      // delete code after 5mins
      const timeout = setTimeout(async () => {
        const deletedCode = await this.FPModal.deleteOne({ code });
        clearTimeout(timeout);
      }, 5000 * 60);

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Code Sent, Check your mail',
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

  public async generateJWT(payload: Partial<MongoUser | any>): Promise<string> {
    this.logger.warn(payload);
    const JWT = sign(payload, process.env.ENCRYPTION_KEY, {
      algorithm: 'HS256',
      expiresIn: '5h',
    });
    return JWT;
  }

  public async generateHashedPassword(password: string): Promise<string> {
    const salt = genSaltSync(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }
}
