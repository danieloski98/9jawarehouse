import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Picture, PictureDocument } from 'src/Schema/Pictures.Schema';
import { ProfilePic, ProfilePicDocument } from 'src/Schema/ProfilePic.Schema';
import { User, UserDocument } from 'src/Schema/User.schema';
import { IFile } from 'src/Types/file';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';
import { join } from 'path';
import { existsSync, rmSync } from 'fs';
import Cloudinary from 'src/utils/cloudinary';

@Injectable()
export class PicsService {
  constructor(
    @InjectModel(Picture.name) private pictureModel: Model<PictureDocument>,
    @InjectModel(ProfilePic.name)
    private profilepicModel: Model<ProfilePicDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async uploadImgs(_id: string, images: Array<IFile>): Promise<IReturnObject> {
    try {
      const user = await this.userModel.findById(_id);
      const record = await this.pictureModel.find({
        user_id: _id,
        approved: false,
      });

      if (record.length > 0) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'You already have an unapproved',
        });
      }

      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }
      const imgs: string[] = [];
      for (let i = 0; i < images.length; i++) {
        const upload = await Cloudinary.uploader.upload(
          join(process.cwd(), `/pictures/${images[i].filename}`),
        );
        imgs.push(upload.secure_url);
        // delete file
        const fileExist = existsSync(
          join(process.cwd(), `/pictures/${images[i].filename}`),
        );

        if (fileExist) {
          // delete the file
          rmSync(join(process.cwd(), `/pictures/${images[i].filename}`));
        }
      }
      const recordRec = await this.pictureModel.create({
        user_id: _id,
        pictures: imgs,
      });

      return Return({
        error: false,
        statusCode: 200,
        data: recordRec,
        successMessage: 'Record created and awaiting approval',
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

  async uploadImg(_id: string, image: IFile): Promise<IReturnObject> {
    try {
      const user = await this.userModel.findById(_id);
      const record = await this.profilepicModel.find({
        user_id: _id,
        approved: false,
      });

      if (record.length > 0) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'You already have an unapproved record',
        });
      }

      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }
      const upload = await Cloudinary.uploader.upload(
        join(process.cwd(), `/pictures/${image.filename}`),
      );
      // delete file
      const fileExist = existsSync(
        join(process.cwd(), `/pictures/${image.filename}`),
      );

      if (fileExist) {
        // delete the file
        rmSync(join(process.cwd(), `/pictures/${image.filename}`));
      }

      const recordRec = await this.profilepicModel.create({
        user_id: _id,
        picture: upload.secure_url,
      });

      return Return({
        error: false,
        statusCode: 200,
        data: recordRec,
        successMessage: 'Record created and awaiting approval',
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
