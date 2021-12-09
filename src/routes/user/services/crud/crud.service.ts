import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestDocument } from 'src/Schema/Test.Schema';
import { UserDocument, User } from 'src/Schema/User.schema';
import { Vacination, VacinationDocument } from 'src/Schema/Vacination.Schema';
import { IFile } from 'src/Types/file';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';
import { join } from 'path';
import { existsSync, rmSync } from 'fs';
import cloudinary from 'src/utils/cloudinary';

@Injectable()
export class CrudService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Vacination.name)
    private VacinationModel: Model<VacinationDocument>,
    @InjectModel(Test.name) private testModel: Model<TestDocument>,
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
      const imgUpdate = await this.userModel.updateOne(
        { _id: id },
        { pictures: images },
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
}
