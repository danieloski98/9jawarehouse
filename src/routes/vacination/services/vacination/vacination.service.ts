import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/Schema/User.schema';
import { Vacination, VacinationDocument } from 'src/Schema/Vacination.Schema';
import { IFile } from 'src/Types/file';
import cloudinary from 'src/utils/cloudinary';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';
import { join } from 'path';
import { existsSync, rmSync } from 'fs';

@Injectable()
export class VacinationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Vacination.name)
    private vacineModel: Model<VacinationDocument>,
  ) {}

  public async createVacination(
    record: Vacination,
    file: IFile,
  ): Promise<IReturnObject> {
    try {
      console.log(record);
      const user = await this.userModel.findById(record.user_id);
      // const vacineRecords = await this.vacineModel.find({
      //   user_id: record.user_id,
      // });

      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User record not found',
        });
      }

      // create a new vacine record
      // upload the vacine image to cloudinary
      const image = await cloudinary.uploader.upload(
        join(process.cwd(), `/files/${file.filename}`),
        {
          overwrite: true,
          invalidate: true,
          width: 810,
          height: 456,
          crop: 'fill',
          resource_type: 'image',
        },
      );
      const update = await this.vacineModel.create({
        user_id: record.user_id,
        image_link: image.secure_url,
      });

      // delete file
      const fileExist = existsSync(
        join(process.cwd(), `/files/${file.filename}`),
      );

      if (fileExist) {
        // delete the file
        rmSync(join(process.cwd(), `/files/${file.filename}`));
      }
      console.log(update);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Record created',
        data: update,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  async deleteRecord(_id: string): Promise<IReturnObject> {
    try {
      const vacine = await this.vacineModel.findOne({ _id });

      if (vacine === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Record not found',
        });
      }

      // delete vacine record
      const deleted = await this.vacineModel.deleteOne({ _id });
      if (deleted.deletedCount > 0) {
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Record Deleted',
        });
      } else {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage:
            'An error occured while trying to delete the record, please try again',
        });
      }
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }
}
