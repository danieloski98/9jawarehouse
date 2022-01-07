import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as moment from 'moment';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    const currentDate = moment(new Date());
    const next = currentDate.add(30, 'days').format('YYYY-MM-DD hh:mm');

    return { nextPaymentDate: next };
  }
}
