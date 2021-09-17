import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CrudService } from './services/crud/crud.service';

@Controller('user')
export class UserController {
  constructor(private crudService: CrudService) {}

  @ApiTags('User')
  @ApiParam({ type: String, name: 'id' })
  @Get(':id')
  async getUserbyid(@Res() res: Response, @Param() param: any) {
    const result = await this.crudService.getUserByID(param['id']);
    res.status(result.statusCode).send(result);
  }
}
