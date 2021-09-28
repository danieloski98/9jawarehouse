import { Body, Controller, Delete, Param, Post, Res } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Test, TestDocument } from 'src/Schema/Test.Schema';
import { TestService } from './services/test/test.service';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}
  @ApiTags('TESTS')
  @ApiBody({ type: Test })
  @Post()
  async uploadTestResult(@Res() res: Response, @Body() body: TestDocument) {
    const result = await this.testService.createTestResult(body);
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
