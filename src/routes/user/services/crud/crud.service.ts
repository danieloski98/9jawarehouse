import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from 'src/Schema/User.schema';
import { IFile } from 'src/Types/file';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';
import { join } from 'path';
import { existsSync, rmSync } from 'fs';
import cloudinary from 'src/utils/cloudinary';
import { CommentDocument, Comment } from 'src/Schema/Comment.Schema';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class CrudService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async getUserByID(id: string): Promise<IReturnObject> {
    try {
      const user = await this.userModel.findOne({ _id: id });
      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      } else {
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'User found',
          data: user,
        });
      }
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async updateCert(id: string, certs: any[]): Promise<IReturnObject> {
    try {
      const user = await this.userModel.findOne({ _id: id });
      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      } else {
        // updated certs
        const update = await this.userModel.updateOne(
          { _id: id },
          { certificates: certs },
        );
        console.log(update);
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'updated Certificates',
          data: user,
        });
      }
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async getUsers(query?: {
    service: string;
    state: string;
    lga: string;
  }): Promise<IReturnObject> {
    try {
      if (query.state) {
        const user = await this.userModel.find({
          verified: true,
          disabled: false,
          blocked: false,
          services: query.service,
          state: query.state,
        });
        const users = [];
        for (let i = 0; i < user.length; i++) {
          const commentCount = await this.commentModel.find({
            business_id: user[i]._id,
          });
          const newObj = {
            ...user[i]['_doc'],
            commentLength: commentCount.length,
          };
          users.push(newObj);
          console.log(commentCount.length);
          // user[i]['commentLenght'] = commentCount.length;
        }
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'User found state',
          data: users,
        });
      }
      // checking of lga
      if (query.lga) {
        const user = await this.userModel.find({
          verified: true,
          disabled: false,
          blocked: false,
          services: query.service.toLowerCase(),
          state: query.state,
          lga: query.lga,
        });
        const users = [];
        for (let i = 0; i < user.length; i++) {
          const commentCount = await this.commentModel.find({
            business_id: user[i]._id,
          });
          const newObj = {
            ...user[i]['_doc'],
            commentLength: commentCount.length,
          };
          users.push(newObj);
          console.log(commentCount.length);
          // user[i]['commentLenght'] = commentCount.length;
        }
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'User found',
          data: users,
        });
      }

      if (!query.state && !query.lga) {
        const user = await this.userModel.find({
          verified: true,
          disabled: false,
          services: query.service,
        });
        const users = [];
        for (let i = 0; i < user.length; i++) {
          const commentCount = await this.commentModel.find({
            business_id: user[i]._id,
          });
          const newObj = {
            ...user[i]['_doc'],
            commentLength: commentCount.length,
          };
          users.push(newObj);
          console.log(commentCount.length);
          // user[i]['commentLenght'] = commentCount.length;
        }
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'User found service',
          data: users,
        });
      }
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async uploadBusinessDetails(
    id: string,
    details: Partial<User>,
  ): Promise<IReturnObject> {
    try {
      const userExist = await this.userModel.findById(id);

      if (userExist === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }

      // update the details
      delete details.email;
      const updatedValues = await this.userModel.updateOne(
        { _id: id },
        details,
      );
      const newUser = await this.userModel.findById(id);
      console.log(newUser);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Done',
        data: {
          user: newUser,
        },
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async uploadImages(id: string, files: IFile[]): Promise<IReturnObject> {
    try {
      const userExist = await this.userModel.findById(id);

      if (userExist === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }

      const images: Array<string> = [];

      for (let i = 0; i < files.length; i++) {
        const upload = await cloudinary.uploader.upload(
          join(process.cwd(), `/pictures/${files[i].filename}`),
          {
            overwrite: true,
            invalidate: true,
            width: 810,
            height: 456,
            crop: 'fill',
            resource_type: 'image',
          },
        );
        const image_url = upload.secure_url;
        images.push(image_url);

        console.log('pushed');

        // delete file
        const fileExist = existsSync(
          join(process.cwd(), `/pictures/${files[i].filename}`),
        );

        if (fileExist) {
          // delete the file
          rmSync(join(process.cwd(), `/pictures/${files[i].filename}`));
        }
      }

      console.log(images);
      // update images
      for (let i = 0; i < images.length; i++) {
        const imgUpdate = await this.userModel.updateOne(
          { _id: id },
          { pictures: images },
        );
        console.log(imgUpdate);
      }

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Done',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async uploadDp(id: string, file: IFile): Promise<IReturnObject> {
    try {
      const userExist = await this.userModel.findById(id);

      if (userExist === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }

      const upload = await cloudinary.uploader.upload(
        join(process.cwd(), `/pictures/${file.filename}`),
        {
          overwrite: true,
          invalidate: true,
          width: 810,
          height: 456,
          crop: 'fill',
          resource_type: 'image',
        },
      );
      const image_url = upload.secure_url;
      const imgUpdate = await this.userModel.updateOne(
        { _id: id },
        { profile_pic: image_url },
      );
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Business creation successful, awaiting verification',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async uploadDocuments(
    id: string,
    details: {
      first_name: string;
      last_name: string;
      business_name: string;
      business_description: string;
      verification_document_type: string;
      verification_document: string;
      cac?: string;
    },
  ): Promise<IReturnObject> {
    try {
      const userExist = await this.userModel.findById(id);
      console.log(id);
      if (userExist === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }

      // update the details
      // upload the images
      const verification_doc = await cloudinary.uploader.upload(
        details.verification_document,
      );
      let cac_doc: UploadApiResponse;
      if (details.cac) {
        cac_doc = await cloudinary.uploader.upload(details.cac);
      }
      const updatedValues = await this.userModel.updateOne(
        { _id: id },
        {
          ...details,
          verification_document_type: details.verification_document_type,
          verification_document: verification_doc.secure_url,
          CAC: cac_doc ? cac_doc.secure_url : '',
          disabled: true,
        },
      );
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Done',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }
}
