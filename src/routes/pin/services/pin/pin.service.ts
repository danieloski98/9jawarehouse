import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PIN, PINDocument } from 'src/Schema/PIN.Schema';
import { User, UserDocument } from 'src/Schema/User.schema';
import { IFile } from 'src/Types/file';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';
import { pipeline } from 'stream';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomNumber = require('random-number');

@Injectable()
export class PinService {
  private logger = new Logger('PinService');
  constructor(
    @InjectModel(PIN.name) private pinModel: Model<PINDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  public async createTestResult(user_id: string): Promise<IReturnObject> {
    try {
      // check if the account exist
      const account = await this.userModel.findById(user_id);
      if (account === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Account not found',
        });
      }
      // check if the user has a pin
      const piinn = await this.pinModel.find({ business_id: user_id });
      this.logger.error(piinn);

      if (piinn.length < 1) {
        // generate PIN
        const options = {
          min: 1000,
          max: 1999,
          integer: true,
        };
        const code = randomNumber(options);

        const pin = await this.pinModel.create({
          code,
          business_id: user_id,
        });

        this.logger.log(pin);

        // update the user
        const updatedUser = await this.userModel.updateOne(
          { _id: user_id },
          { pin: true },
        );
        this.logger.log(updatedUser);

        // get new User
        const user = await this.userModel.findById(user_id);

        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Pin generated succesfully',
          data: {
            user,
            pin: code,
          },
        });
      } else {
        // renew Pin
        // generate PIN
        const options = {
          min: 1000,
          max: 1999,
          integer: true,
        };
        const code = randomNumber(options);

        const pin = await this.pinModel.updateOne(
          { _id: piinn[0]._id },
          {
            code,
          },
        );

        this.logger.log(pin);
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Pin generated succesfully',
          data: {
            pin,
          },
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

  public async getPin(id: string): Promise<IReturnObject> {
    try {
      const pin = await this.pinModel.findOne({ business_id: id });
      if (pin === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Pin not found',
        });
      }
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Pin',
        data: pin,
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
