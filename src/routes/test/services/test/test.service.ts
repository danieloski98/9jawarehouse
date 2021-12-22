import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PIN, PINDocument } from 'src/Schema/PIN.Schema';
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
    @InjectModel(PIN.name) private testModel: Model<PINDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  public async createTestResult(
    test?: PINDocument,
    file?: IFile,
  ): Promise<IReturnObject> {
    try {
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
