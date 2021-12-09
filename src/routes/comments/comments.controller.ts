import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CrudService } from './services/crud/crud.service';
import { Comment } from 'src/Schema/Comment.Schema';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('comments')
export class CommentsController {
  constructor(private crudService: CrudService) {}

  @ApiTags('REVIEWS')
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  async getReviews(@Res() res: Response, @Param() param: any) {
    const result = await this.crudService.getReviews(param['id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('REVIEWS')
  @ApiParam({ name: 'id', type: String })
  @Post(':id')
  async createComment(
    @Res() res: Response,
    @Param() param: any,
    @Body() body: Comment,
  ) {
    const result = await this.crudService.addCommnet(param['id'], body);
    res.status(result.statusCode).send(result);
  }
}
