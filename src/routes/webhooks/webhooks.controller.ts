import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('webhooks')
export class WebhooksController {
  @ApiTags('WEBHOOK')
  @Get()
  async recieveMessage(@Res() res: Response) {
    res.send({ msg: 'Hello there' });
  }
}
