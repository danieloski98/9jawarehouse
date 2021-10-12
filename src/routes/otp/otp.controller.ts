import { Controller, Get, Param, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Model } from 'mongoose';
import { Otp, OtpDocument } from 'src/Schema/Otp.schema';
import { User, UserDocument } from 'src/Schema/User.schema';
import { Return } from 'src/utils/Returnfunctions';
import { OtpGateway } from 'src/websockets/otp.gateway';
import { setTimeout } from 'timers';
import { CrudService } from '../user/services/crud/crud.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomNumber = require('random-number');

@Controller('otp')
export class OtpController {
  constructor(
    private webSocket: OtpGateway,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
    private userService: CrudService,
  ) {}

  @Get(':user_id')
  @ApiTags('OTP')
  @ApiParam({ name: 'user_id', type: String })
  async getCode(@Res() res: Response, @Param() param: any) {
    try {
      // check for user
      const user = await this.userModel.findOne({ _id: param['user_id'] });
      if (user === null) {
        res.status(400).send(
          Return({
            error: true,
            statusCode: 400,
            errorMessage: 'User not found',
          }),
        );
      }

      // generate code
      const options = {
        min: 1000,
        max: 1999,
        integer: true,
      };
      const code = randomNumber(options);
      console.log(code);

      const opt = await this.otpModel.create({
        user_id: param['user_id'],
        code,
      });

      console.log(opt);

      // delete code after 5 minutes
      const timer = setTimeout(async () => {
        // delete the code
        await this.otpModel.updateOne({ code }, { expired: true });
        console.log('deleted');
        clearTimeout(timer);
      }, 5000 * 60);

      // send out request
      this.webSocket.server.emit(`${param['user_id']}:otp`, {
        otp: code,
        timeStamp: opt.created_at,
      });
      res.status(200).send(
        Return({
          error: false,
          statusCode: 200,
          successMessage: 'User otp sent!',
        }),
      );
    } catch (error) {
      res.status(500).send(
        Return({
          error: true,
          statusCode: 500,
          errorMessage: 'Internal Server Error',
          trace: error,
        }),
      );
    }
  }

  @Get('verify/:code')
  @ApiTags('OTP')
  @ApiParam({ name: 'code', type: Number })
  async verifyCode(@Res() res: Response, @Param() param: any) {
    try {
      const checkcode = await this.otpModel.findOne({
        code: param['code'],
        expired: false,
      });
      if (checkcode === null) {
        res.status(400).send(
          Return({
            error: true,
            statusCode: 400,
            errorMessage: 'Invalid code',
          }),
        );
      } else {
        // send back the user details
        const details = await this.userService.getUserByID(checkcode.user_id);
        // delete the code
        const deletedCode = await this.otpModel.deleteOne({
          _id: checkcode._id,
        });
        console.log(deletedCode);
        res.status(details.statusCode).send(details);
      }
    } catch (error) {
      res.status(500).send(
        Return({
          error: true,
          statusCode: 500,
          errorMessage: 'Internal Server Error',
          trace: error,
        }),
      );
    }
  }
}
