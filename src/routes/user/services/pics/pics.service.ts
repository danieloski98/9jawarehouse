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
import { Record, RecordDocument } from 'src/Schema/Record.Schema';

@Injectable()
export class PicsService {
  constructor(
    @InjectModel(Picture.name) private pictureModel: Model<PictureDocument>,
    @InjectModel(ProfilePic.name)
    private profilepicModel: Model<ProfilePicDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Record.name) private recordModel: Model<RecordDocument>,
  ) {}

  async uploadInitialImgs(
    _id: string,
    images: Array<IFile>,
  ): Promise<IReturnObject> {
    try {
      console.log(images);
      const user = await this.userModel.findById(_id);

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
          {
            transformation: {
              width: 920,
              height: 450,
            },
          },
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
      // const rec = {
      //   images: imgs,
      //   user_id: _id,
      // };
      const update = await this.userModel.updateOne(
        { _id },
        { pictures: imgs },
      );
      // const recordRec = await this.recordModel.create(rec);

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Record created and awaiting approval',
      });
    } catch (error) {
      console.log(error);
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }

  async uploadImgs(_id: string, images: Array<IFile>): Promise<IReturnObject> {
    try {
      console.log(images);
      const user = await this.userModel.findById(_id);
      const record = await this.recordModel.findOne({
        user_id: _id,
        approved: false,
      });

      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }

      if (record === null || record === undefined) {
        const imgs: string[] = [];
        for (let i = 0; i < images.length; i++) {
          const upload = await Cloudinary.uploader.upload(
            join(process.cwd(), `/pictures/${images[i].filename}`),
            {
              transformation: {
                width: 1920,
                height: 720,
              },
            },
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
        const rec = {
          images: imgs,
          user_id: _id,
        };
        const recordRec = await this.recordModel.create(rec);

        return Return({
          error: false,
          statusCode: 200,
          data: recordRec,
          successMessage: 'Record created and awaiting approval',
        });
      }

      if (record.images.length > 0) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'You already have an unapproved record',
        });
      }

      if (record.images.length < 1) {
        const imgs: string[] = [];
        for (let i = 0; i < images.length; i++) {
          const upload = await Cloudinary.uploader.upload(
            join(process.cwd(), `/pictures/${images[i].filename}`),
            {
              transformation: {
                width: 920,
                height: 250,
              },
            },
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
        const update = await this.recordModel.updateOne(
          { _id: record._id },
          { images: imgs },
        );

        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Record created and awaiting approval',
        });
      }
    } catch (error) {
      console.log(error);
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
      const record = await this.recordModel.findOne({
        user_id: _id,
        approved: false,
      });

      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }

      const upload = await Cloudinary.uploader.upload(
        join(process.cwd(), `/pictures/${image.filename}`),
        {
          transformation: {
            width: 140,
            height: 140,
            format: 'png',
          },
        },
      );
      // delete file
      const fileExist = existsSync(
        join(process.cwd(), `/pictures/${image.filename}`),
      );
      if (fileExist) {
        // delete the file
        rmSync(join(process.cwd(), `/pictures/${image.filename}`));
      }

      // update record
      const newPic = await this.userModel.updateOne(
        { _id },
        { profile_pic: upload.secure_url },
      );
      const newUser = await this.userModel.findById(_id);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Profile Pic updated',
        data: newUser,
      });
    } catch (error) {
      console.log(error);
      return Return({
        error: true,
        statusCode: 500,
        trace: error,
        errorMessage: 'Internal Server error.',
      });
    }
  }
}
