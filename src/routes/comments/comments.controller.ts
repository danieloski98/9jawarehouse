import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { CrudService } from './services/crud/crud.service';
import { Comment } from 'src/Schema/Comment.Schema';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { IFile } from 'src/Types/file';

@Controller('comments')
export class CommentsController {
  constructor(private crudService: CrudService) {}

  @ApiTags('REVIEWS')
  @Get('admin')
  async getAllReviews(@Res() res: Response) {
    const result = await this.crudService.getAllReviews();
    res.status(result.statusCode).send(result);
  }

  @ApiTags('REVIEWS')
  @ApiParam({ name: 'user_id', type: String })
  @Get(':user_id')
  async getReviews(@Res() res: Response, @Param() param: any) {
    const result = await this.crudService.getReviews(param['user_id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('REVIEWS')
  @ApiParam({ name: 'id', type: String })
  @Put('admin/approve/:id')
  async acceptReviews(@Res() res: Response, @Param() param: any) {
    const result = await this.crudService.acceptReview(param['id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('REVIEWS')
  @ApiParam({ name: 'id', type: String })
  @Put('admin/decline/:id')
  async declineReviews(@Res() res: Response, @Param() param: any) {
    const result = await this.crudService.declineReview(param['id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('REVIEWS')
  @ApiParam({ name: 'comment_id', type: String })
  @UseInterceptors(AnyFilesInterceptor({ dest: 'commentPics' }))
  @Post('uploads/:comment_id')
  async uploadPics(
    @Res() res: Response,
    @Param() param: any,
    @UploadedFiles() files: Array<IFile>,
  ) {
    const result = await this.crudService.uploadReviewImages(
      param['comment_id'],
      files,
    );
    res.status(result.statusCode).send(result);
  }

  @ApiTags('REVIEWS')
  @ApiParam({ name: 'id', type: String })
  @Post('/:user_id/:pin')
  async createComment(
    @Res() res: Response,
    @Param() param: any,
    @Body() body: Comment,
  ) {
    const result = await this.crudService.addCommnet(
      param['user_id'],
      param['pin'],
      body,
    );
    res.status(result.statusCode).send(result);
  }
}
