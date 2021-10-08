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
import { Test, TestDocument } from 'src/Schema/Test.Schema';
import { IFile } from 'src/Types/file';
import { TestService } from './services/test/test.service';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @ApiTags('TESTS')
  @ApiParam({ name: 'user_id', type: String })
  @Get(':user_id')
  async getTestResult(@Res() res: Response, @Param() param: any) {
    const result = await this.testService.getAllTest(param['user_id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('TESTS')
  @ApiBody({ type: Test })
  @UseInterceptors(FileInterceptor('link', { dest: 'files' }))
  @Post()
  async uploadTestResult(
    @Res() res: Response,
    @Body() body: TestDocument,
    @UploadedFile() file: IFile,
  ) {
    const result = await this.testService.createTestResult(body, file);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('TESTS')
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  async deleteTestResult(@Res() res: Response, @Param() param: any) {
    const result = await this.testService.deleteTest(param['id']);
    res.status(result.statusCode).send(result);
  }
}
