import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { UserService } from './services/user/user.service';
import { User as MongoUser, UserDocument } from 'src/Schema/User.schema';

class ChangePassword {
  @ApiProperty({
    type: String,
  })
  newpassword: string;

  @ApiProperty({
    type: String,
  })
  oldpassword: string;
}

export class ResetPassword {
  @ApiProperty({
    type: String,
  })
  newpassword: string;

  @ApiProperty({
    type: String,
  })
  confirmpassword: string;
}

class LoginDetails {
  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  // GET
  @Post('verify/:userid/:code')
  @ApiParam({ name: 'userid', type: String, description: 'The users id' })
  @ApiParam({
    name: 'code',
    type: Number,
    description: 'The code the user recieved',
  })
  @ApiTags('AUTH')
  @ApiOkResponse({ description: 'Account verified' })
  @ApiBadRequestResponse({
    description: 'There was an error, check the return body',
  })
  @ApiInternalServerErrorResponse({
    description: 'Interal server error, contact the dev!',
  })
  async verify(@Res() res: Response, @Param() param: any) {
    const result = await this.userService.verifyUser(
      param['userid'],
      param['code'],
    );
    if (result.statusCode === 200) {
      res.status(result.statusCode).send(result);
    } else {
      res.status(result.statusCode).send(result);
    }
  }

  // POST ROUTES

  @ApiTags('AUTH')
  @Post('register')
  @ApiBody({ type: MongoUser })
  @ApiOkResponse({ description: 'Account created' })
  @ApiBadRequestResponse({
    description: 'There was an error, check the return body',
  })
  @ApiInternalServerErrorResponse({
    description: 'Interal server error, contact the dev!',
  })
  async register(@Res() res: Response, @Body() body: MongoUser) {
    const result = await this.userService.createAccount(body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('AUTH')
  @Post('login')
  @ApiBody({ type: LoginDetails })
  @ApiOkResponse({ description: 'Account created' })
  @ApiBadRequestResponse({
    description: 'There was an error, check the return body',
  })
  @ApiInternalServerErrorResponse({
    description: 'Interal server error, contact the dev!',
  })
  async login(@Res() res: Response, @Body() body: Partial<MongoUser>) {
    const result = await this.userService.loginUser(body);
    res.status(result.statusCode).send(result);
  }

  @Post('forgotpassword/:email')
  @ApiTags('AUTH')
  @ApiParam({ type: String, name: 'email' })
  @ApiOkResponse({ description: 'link sent' })
  @ApiBadRequestResponse({
    description: 'There was an error, check the return body',
  })
  @ApiInternalServerErrorResponse({
    description: 'Interal server error, contact the dev!',
  })
  async forgotpassword(@Res() res: Response, @Param() param: any) {
    console.log(param);
    const result = await this.userService.forgotpassword(param['email']);
    res.status(result.statusCode).send(result);
  }

  // PUT Routes
  @ApiTags('AUTH')
  @Post('changepassword/:user_id')
  @ApiParam({ name: 'user_id', type: String })
  @ApiBody({ type: ChangePassword })
  @ApiOkResponse({ description: 'password updated successfully' })
  @ApiBadRequestResponse({
    description: 'There was an error, check the return body',
  })
  @ApiInternalServerErrorResponse({
    description: 'Interal server error, contact the dev!',
  })
  async changepassword(
    @Res() res: Response,
    @Param() param: any,
    @Body() body: ChangePassword,
  ) {
    const result = await this.userService.changePassword(
      param['user_id'],
      body,
    );
    res.status(result.statusCode).send(result);
  }

  @ApiTags('AUTH')
  @Post('resetpassword/:otp')
  @ApiParam({ name: 'user_id', type: String })
  @ApiParam({ name: 'otp', type: Number })
  @ApiBody({ type: ResetPassword })
  @ApiOkResponse({ description: 'password updated successfully' })
  @ApiBadRequestResponse({
    description: 'There was an error, check the return body',
  })
  @ApiInternalServerErrorResponse({
    description: 'Interal server error, contact the dev!',
  })
  async resetpassword(
    @Res() res: Response,
    @Param() param: any,
    @Body() body: ResetPassword,
  ) {
    const result = await this.userService.resetPassword(param['otp'], body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('AUTH')
  @Post('resendverificationcode/:email')
  @ApiParam({ name: 'email', type: String })
  @ApiBody({ type: ResetPassword })
  @ApiOkResponse({ description: 'password updated successfully' })
  @ApiBadRequestResponse({
    description: 'There was an error, check the return body',
  })
  @ApiInternalServerErrorResponse({
    description: 'Interal server error, contact the dev!',
  })
  async resendVerificationode(@Res() res: Response, @Param() param: any) {
    const result = await this.userService.resendVerificationCode(
      param['email'],
    );
    res.status(result.statusCode).send(result);
  }

  @ApiTags('AUTH')
  @Post('resendresetcode/:email')
  @ApiParam({ name: 'email', type: String })
  @ApiBody({ type: ResetPassword })
  @ApiOkResponse({ description: 'password updated successfully' })
  @ApiBadRequestResponse({
    description: 'There was an error, check the return body',
  })
  @ApiInternalServerErrorResponse({
    description: 'Interal server error, contact the dev!',
  })
  async resendResetCode(@Res() res: Response, @Param() param: any) {
    const result = await this.userService.resendResetCode(param['email']);
    res.status(result.statusCode).send(result);
  }
}
