import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from 'src/Schema/User.schema';
import { CommentDocument, Comment } from 'src/Schema/Comment.Schema';
import {
  SubscriptionDocument,
  Subscription,
} from 'src/Schema/Subscriptions.Schema';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  async getAllUser(): Promise<IReturnObject> {
    try {
      const users = await this.userModel.find();
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Users found',
        data: users,
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

  async getAllUserByID(_id: string): Promise<IReturnObject> {
    try {
      const users = await this.userModel.findOne({ _id });
      const comments = await this.commentModel.find({ business_id: _id });
      const subscriptions = await this.subscriptionModel.find({
        business_id: _id,
      });

      const obj = {
        ...users['_doc'],
        subscriptions,
        comments,
      };
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Users found',
        data: obj,
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

  async deleteUserByID(_id: string): Promise<IReturnObject> {
    try {
      const users = await this.userModel.deleteOne({ _id });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Users Deleted',
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

  async approveUserByID(_id: string): Promise<IReturnObject> {
    try {
      const user = await this.userModel.updateOne({ _id }, { disabled: false });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Users account enabled',
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
