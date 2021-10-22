import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Message } from 'src/Schema/Message.Schema';
import { CrudService } from './services/crud/crud.service';

@Controller('messages')
export class MessagesController {
  constructor(private crudService: CrudService) {}

  // get all mesages
  @Get()
  @ApiTags('MESSAGES')
  async getMessages(@Res() res: Response) {
    const result = await this.crudService.getAllMessages();
    res.status(result.statusCode).send(result);
  }

  // create messages
  @Post()
  @ApiTags('MESSAGES')
  @ApiBody({ type: Message })
  async createMessage(@Res() res: Response, @Body() body: Message) {
    const result = await this.crudService.createMessage(body);
    res.status(result.statusCode).send(result);
  }
}
