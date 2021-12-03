import {
  Controller,
  Post,
  Res,
  Body,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Service, ServiceDocument } from 'src/Schema/Services.Schema';
import { CrudService } from './service/crud/crud.service';

@Controller('services')
export class ServicesController {
  constructor(private crudService: CrudService) {}

  // get routes
  @ApiTags('Services')
  @Get()
  async getServices(@Res() res: Response) {
    const result = await this.crudService.getAllServices();
    res.status(result.statusCode).send(result);
  }

  // post routes
  @ApiTags('Services')
  @ApiBody({ type: Service })
  @Post()
  async createService(
    @Res() res: Response,
    @Body() body: Partial<ServiceDocument>,
  ) {
    const result = await this.crudService.createService(body);
    res.status(result.statusCode).send(result);
  }

  // delete route
  @ApiTags('Services')
  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async deleteService(@Res() res: Response, @Param() param: any) {
    const result = await this.crudService.deleteService(param['id']);
    res.status(result.statusCode).send(result);
  }
}
