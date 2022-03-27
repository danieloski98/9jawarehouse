import { Controller, Get, Res } from '@nestjs/common';
import { GeneralService } from './services/general/general.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('analytics')
export class AnalyticsController {
  constructor(private generalService: GeneralService) {}

  @ApiTags('ANALYTICS')
  @Get('overview')
  async getOverview(@Res() res: Response) {
    const result = await this.generalService.overview();
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ANALYTICS')
  @Get('vendors')
  async getVendors(@Res() res: Response) {
    const result = await this.generalService.vendors();
    res.status(result.statusCode).send(result);
  }
  

  @ApiTags('ANALYTICS')
  @Get('comments')
  async getComments(@Res() res: Response) {
    const result = await this.generalService.comments();
    res.status(result.statusCode).send(result);
  }
}
