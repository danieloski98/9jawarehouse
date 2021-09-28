import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Vacination } from 'src/Schema/Vacination.Schema';
import { VacinationService } from './services/vacination/vacination.service';

@Controller('vacination')
export class VacinationController {
  constructor(private vacineService: VacinationService) {}

  @Post()
  @ApiTags('VACINATION')
  @ApiBody({ type: Vacination })
  async createRecord(@Res() res: Response, @Body() body: Vacination) {
    const result = await this.vacineService.createVacination(body);
    res.status(result.statusCode).send(result);
  }
}
