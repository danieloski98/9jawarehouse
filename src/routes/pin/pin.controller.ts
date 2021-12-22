import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PIN, PINDocument } from 'src/Schema/PIN.Schema';
import { PinService } from './services/pin/pin.service';

@Controller('pin')
export class PinController {
  constructor(private testService: PinService) {}

  @ApiTags('TESTS')
  @ApiParam({ name: 'user_id', type: String })
  @Get(':user_id')
  async getTestResult(@Res() res: Response, @Param() param: any) {
    const result = await this.testService.getPin(param['user_id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('PIN')
  @ApiBody({ type: PIN })
  @UseInterceptors(FileInterceptor('link', { dest: 'files' }))
  @Post('generate/:id')
  async uploadTestResult(@Res() res: Response, @Param() param: any) {
    const result = await this.testService.createTestResult(param['id']);
    res.status(result.statusCode).send(result);
  }

  // @ApiTags('PIN')
  // @ApiParam({ name: 'id', type: String })
  // @Delete(':id')
  // async deleteTestResult(@Res() res: Response, @Param() param: any) {
  //   const result = await this.testService.deleteTest(param['id']);
  //   res.status(result.statusCode).send(result);
  // }
}
