import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CrudService } from './services/crud/crud.service';
import { Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { EmailList } from 'src/Schema/EmailList.Schema';

@Controller('emaillist')
export class EmaillistController {
  constructor(private crudService: CrudService) {}

  @Get()
  @ApiTags('EMAILLIST')
  async getAllEmails(@Res() res: Response) {
    const result = await this.crudService.getEmails();
    res.status(result.statusCode).send(result);
  }

  @Post()
  @ApiTags('EMAILLIST')
  @ApiBody({ type: EmailList })
  async addEmail(@Res() res: Response, @Body() body: EmailList) {
    const result = await this.crudService.registerEmail(body.email);
    res.status(result.statusCode).send(result);
  }
}
