import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestDocument } from 'src/Schema/Test.Schema';
import { UserDocument, User } from 'src/Schema/User.schema';
import { Vacination, VacinationDocument } from 'src/Schema/Vacination.Schema';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';

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
      const tests = await this.testModel.find({ user_id: id });
      const vacinations = await this.VacinationModel.find({ user_id: id });
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
          data: {
            email: user.email,
            phone: user.phone,
            first_name: user.first_name,
            last_name: user.last_name,
            verified: user.verified,
            tests,
            vacinations,
          },
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
}
