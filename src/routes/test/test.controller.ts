import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PIN, PINDocument } from 'src/Schema/PIN.Schema';
import { IFile } from 'src/Types/file';
import { TestService } from './services/test/test.service';

@Controller('pin')
export class TestController {
  constructor(private testService: TestService) {}

  // @ApiTags('TESTS')
  @ApiParam({ name: 'user_id', type: String })
  @Get(':user_id')
  async getTestResult(@Res() res: Response, @Param() param: any) {
    const result = await this.testService.getAllTest(param['user_id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('PIN')
  @ApiBody({ type: PIN })
  @UseInterceptors(FileInterceptor('link', { dest: 'files' }))
  @Post('create')
  async uploadTestResult(
    @Res() res: Response,
    @Body() body: PINDocument,
    @UploadedFile() file: IFile,
  ) {
    const result = await this.testService.createTestResult(body, file);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('PIN')
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  async deleteTestResult(@Res() res: Response, @Param() param: any) {
    const result = await this.testService.deleteTest(param['id']);
    res.status(result.statusCode).send(result);
  }
}
