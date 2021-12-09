import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from 'src/Schema/Comment.Schema';
import { UserDocument, User } from 'src/Schema/User.schema';

import * as joi from 'joi';
import { IReturnObject } from 'src/utils/ReturnObject';
import { Return } from 'src/utils/Returnfunctions';

@Injectable()
export class CrudService {
  private logger = new Logger();
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async addCommnet(id: string, payload: Comment): Promise<IReturnObject> {
    try {
      const validationSchema = joi.object({
        fullname: joi.string().required(),
        email: joi.string().email().required(),
        rating: joi.number().optional().max(5).min(0),
        comment: joi.string().required(),
        pictures: joi.array().optional(),
      });

      const userExist = await this.userModel.findById(id);
      if (userExist === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }

      // validate record
      const validation = validationSchema.validate(payload);
      if (validation.error) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: validation.error.message,
        });
      }
      const obj: Comment = {
        ...payload,
        business_id: id,
      };
      const newComment = await this.commentModel.create(obj);
      this.logger.log(newComment);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Review sent submitted',
        data: newComment,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal server Error',
        trace: error,
      });
    }
  }

  async getReviews(id: string): Promise<IReturnObject> {
    try {
      const userExist = await this.userModel.findById(id);
      if (userExist === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }

      const reviews = await this.commentModel.find({ business_id: id });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Reviews gotten',
        data: reviews,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal server Error',
        trace: error,
      });
    }
  }
}
