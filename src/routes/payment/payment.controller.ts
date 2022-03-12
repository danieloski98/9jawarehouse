import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserService as PaymentUserService } from './services/user/user.service';

class GenLinkPayload {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;
}

@Controller('payment')
export class PaymentController {
  constructor(private userService: PaymentUserService) {}

  @ApiTags('PAYMENT')
  @ApiParam({ name: 'vendor_id' })
  @Get('subscriptions/:vendor_id')
  async getpayment(@Res() res: Response, @Param() param: any) {
    const request = await this.userService.getAllSubs(param['id']);
    res.status(request.statusCode).send(request);
  }

  @ApiTags('PAYMENT')
  @Get('subscriptions')
  async getallsubs(@Res() res: Response) {
    const request = await this.userService.getSubs();
    res.status(request.statusCode).send(request);
  }

  @ApiTags('PAYMENT')
  @ApiBody({ type: GenLinkPayload })
  @Post()
  async generateLink(
    @Res() res: Response,
    @Body() body: { id: string; amount: number },
    @Query() query: any,
  ) {
    const request = await this.userService.generateLink(
      body.id,
      body.amount,
      query['plan'],
    );
    res.status(request.statusCode).send(request);
  }

  @ApiTags('PAYMENT')
  @ApiParam({ name: 'reference' })
  @Post('verify/:reference')
  async verifypayment(@Res() res: Response, @Param() param: any) {
    const request = await this.userService.verifyPayment(param['reference']);
    res.status(request.statusCode).send(request);
  }
}
