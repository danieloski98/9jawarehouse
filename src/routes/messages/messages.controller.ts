import { Body, Controller, Post, Res } from '@nestjs/common';
import { MessageService } from './message/message.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessageService) {}

  @ApiTags('MESSAGE')
  @Post()
  async createMessage(@Res() res: Response, @Body() body: any) {
    const request = await this.messageService.createMessage(body);
    res.status(request.statusCode).send(request);
  }
}
