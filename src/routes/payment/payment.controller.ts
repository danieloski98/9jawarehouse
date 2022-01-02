import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserService } from './services/user/user.service';

class GenLinkPayload {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;
}

@Controller('payment')
export class PaymentController {
  constructor(private userService: UserService) {}

  @ApiTags('PAYMENT')
  @ApiParam({ name: 'id' })
  @Get('subscriptions/:id')
  async getpayment(@Res() res: Response, @Param() param: any) {
    const request = await this.userService.getAllSubs(param['id']);
    res.status(request.statusCode).send(request);
  }

  @ApiTags('PAYMENT')
  @ApiBody({ type: GenLinkPayload })
  @Post()
  async generateLink(
    @Res() res: Response,
    @Body() body: { id: string; amount: number },
  ) {
    const request = await this.userService.generateLink(body.id, body.amount);
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
