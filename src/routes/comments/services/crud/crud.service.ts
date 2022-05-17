import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDocument, Comment } from 'src/Schema/Comment.Schema';
import { UserDocument, User } from 'src/Schema/User.schema';
import { PinService } from 'src/routes/pin/services/pin/pin.service';

import * as joi from 'joi';
import { IReturnObject } from 'src/utils/ReturnObject';
import { Return } from 'src/utils/Returnfunctions';
import { PINDocument, PIN } from 'src/Schema/PIN.Schema';
import { IFile } from 'src/Types/file';
import Cloudinary from 'src/utils/cloudinary';
import { join } from 'path';
import { existsSync, rmSync } from 'fs';
import { NotificationUserService as UserNotificationService } from 'src/routes/notifications/services/user/user.service';

@Injectable()
export class CrudService {
  private logger = new Logger();
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(PIN.name) private pinModel: Model<PINDocument>,
    private pinService: PinService,
    private userNotificationService: UserNotificationService,
  ) {}

  async addCommnet(
    user_id: string,
    pin: string,
    payload: Comment,
  ): Promise<IReturnObject> {
    try {
      const validationSchema = joi.object({
        fullname: joi.string().required(),
        email: joi.string().email().required(),
        rating: joi.number().optional().max(5).min(0),
        comment: joi.string().required(),
        pictures: joi.array().optional(),
      });

      const pinActive = await this.pinModel.findOne({
        business_id: user_id,
        code: pin,
      });

      if (pinActive === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage:
            'Invalid pin, please contact the vendor for the correct pin.',
        });
      }
      const comments = await this.commentModel.find({ user_id });
      if (pinActive.use_count < 1) {
        const userExist = await this.userModel.findById(user_id);
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
          business_id: user_id,
        };
        const newComment = await this.commentModel.create(obj);
        const updatePin = await this.pinModel.updateOne(
          { _id: pinActive._id },
          { use_count: pinActive.use_count + 1 },
        );
        let rating = payload.rating;
        for (let i = 0; i < comments.length; i++) {
          rating += comments[i].rating;
        }
        const userUpdate = await this.userModel.updateOne(
          { _id: user_id },
          {
            rating: rating > 5 ? 5 : rating / comments.length - 1,
          },
        );
        console.log(updatePin);
        this.logger.log(newComment);
        // this.userNotificationService.triggerNotification(
        //   user_id,
        //   `User with name ${payload.fullname} left a review for your business. The review is await approval.`,
        // );
        this.userNotificationService.triggerAdminNotification(
          `A customer left a comment.`,
        );
        this.userNotificationService.triggerNotification(
          user_id,
          `A user left you a comment, and it is awaiting approval`,
        );
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Review sent submitted',
          data: newComment,
        });
      } else {
        const userExist = await this.userModel.findById(user_id);
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
          business_id: user_id,
        };
        const newComment = await this.commentModel.create(obj);
        let rating = payload.rating;
        for (let i = 0; i < comments.length; i++) {
          rating += comments[i].rating;
        }
        const userUpdate = await this.userModel.updateOne(
          { _id: user_id },
          {
            rating: rating > 5 ? 5 : rating / comments.length - 1,
          },
        );
        // renew pin
        await this.pinService.createPin(user_id);

        this.userNotificationService.triggerAdminNotification(
          `A customer left a comment.`,
        );
        this.userNotificationService.triggerNotification(
          user_id,
          `A user left you a comment, and it is awaiting approval`,
        );

        this.logger.log(newComment);
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Review sent submitted',
          data: newComment,
        });
      }
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal server Error',
        trace: error,
      });
    }
  }

  async acceptReview(id: string): Promise<IReturnObject> {
    try {
      const reviews = await this.commentModel.updateOne(
        { _id: id },
        { reviewed: true },
      );
      console.log(reviews);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Review approved',
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

  async declineReview(id: string): Promise<IReturnObject> {
    try {
      const reviews = await this.commentModel.deleteOne({ _id: id });
      console.log(reviews);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Review Rejected and deleted',
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

  async getAllReviews(): Promise<IReturnObject> {
    try {
      const reviews = await this.commentModel.find();
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
      console.log(reviews);
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

  async uploadReviewImages(
    id: string,
    images: Array<IFile>,
  ): Promise<IReturnObject> {
    try {
      // check if the comment exist
      const comment = await this.commentModel.findById(id);
      if (comment === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Comment not found',
        });
      }
      // upload images
      if (images.length < 1) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'No image to upload',
        });
      } else {
        const imgs: string[] = [];
        for (let i = 0; i < images.length; i++) {
          const upload = await Cloudinary.uploader.upload(
            join(process.cwd(), `/commentPics/${images[i].filename}`),
          );
          imgs.push(upload.secure_url);

          // delete file
          const fileExist = existsSync(
            join(process.cwd(), `/commentPics/${images[i].filename}`),
          );

          if (fileExist) {
            // delete the file
            rmSync(join(process.cwd(), `/commentPics/${images[i].filename}`));
          }
        }

        const update = await this.commentModel.updateOne(
          { _id: id },
          { pictures: imgs },
        );
        console.log(update);

        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Image uploaded Successfully',
        });
      }
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
