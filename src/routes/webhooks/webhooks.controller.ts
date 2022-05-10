import { Controller, Get, Res, Req, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { createHmac } from 'crypto';
import { WebhooksService } from './webhooks.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Controller('webhooks')
export class WebhooksController {
  constructor(private webhookService: WebhooksService) {}
  @ApiTags('WEBHOOK')
  @Get()
  async recieveMessage(
    @Res() res: Response,
    @Req() req: Request,
    @Body() body: any,
  ) {
    // check the header
    // const hash = createHmac('sha512', process.env.PS_SECRET)
    //   .update(JSON.stringify(req.body))
    //   .digest('hex');

    // if (hash === req.headers['x-paystack-signature']) {
    //   // do something with the body
    // }
    await this.webhookService.createCronJob(body);
    res.status(200).send({ message: 'acknowlegded' });
  }
}
