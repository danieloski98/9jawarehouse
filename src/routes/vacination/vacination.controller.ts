import {
  Body,
  Controller,
  Post,
  Res,
  UseInterceptors,
  UploadedFile,
  Req,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Vacination } from 'src/Schema/Vacination.Schema';
import { VacinationService } from './services/vacination/vacination.service';

@Controller('vacination')
export class VacinationController {
  constructor(private vacineService: VacinationService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image_link', { dest: 'files' }))
  @ApiTags('VACINATION')
  @ApiBody({ type: Vacination })
  async createRecord(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: Vacination,
    @UploadedFile() file: any,
  ) {
    console.log(file);
    console.log('content-type', req.headers);
    const result = await this.vacineService.createVacination(body, file);
    console.log(body);
    res.status(result.statusCode).send(result);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  async deleteRecord(@Res() res: Response, @Param() param: any) {
    const result = await this.vacineService.deleteRecord(param['id']);
    res.status(result.statusCode).send(result);
  }
}
