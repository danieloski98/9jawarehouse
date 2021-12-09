import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestDocument } from 'src/Schema/Test.Schema';
import { User, UserDocument } from 'src/Schema/User.schema';
import { IFile } from 'src/Types/file';
import cloudinary from 'src/utils/cloudinary';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';
import { join } from 'path';
import { existsSync, rmSync } from 'fs';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name) private testModel: Model<TestDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  public async createTestResult(
    test: TestDocument,
    file: IFile,
  ): Promise<IReturnObject> {
    try {
      console.log(test);
      // check if the user exists
      const user = await this.userModel.findOne({ _id: test.user_id });
      console.log(user);
      if (user === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User not found',
        });
      }
      // upload the image to cloudinry
      const upload = await cloudinary.uploader.upload(
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
      const image_url = upload.secure_url;
      console.log(image_url);

      // delete file
      const fileExist = existsSync(
        join(process.cwd(), `/files/${file.filename}`),
      );

      if (fileExist) {
        // delete the file
        rmSync(join(process.cwd(), `/files/${file.filename}`));
      }

      // create the object
      const obj = {
        link: image_url,
        user_id: test.user_id,
        facility: test.facility,
        date_taken: test.date_taken,
        result: test.result,
      };
      const newTest = await this.testModel.create(obj);
      console.log(newTest);

      return Return({
        error: true,
        statusCode: 200,
        successMessage: 'Test result uploaded successfully',
        data: newTest,
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

  public async deleteTest(id: string): Promise<IReturnObject> {
    try {
      const test = await this.testModel.findOne({ _id: id });
      if (test === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Record not found',
        });
      }

      // delete
      const deleted = await this.testModel.deleteOne({ _id: id });
      console.log(deleted);

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Test Record Deleted',
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

  public async getAllTest(user_id: string): Promise<IReturnObject> {
    try {
      const tests = await this.testModel.find({ user_id });
      if (tests.length < 1) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Record not found',
        });
      }

      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Test Records',
        data: tests,
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
}
