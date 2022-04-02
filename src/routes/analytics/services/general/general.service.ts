import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/Schema/User.schema';
import { Comment, CommentDocument } from 'src/Schema/Comment.Schema';
import {
  Subscription,
  SubscriptionDocument,
} from 'src/Schema/Subscriptions.Schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';

@Injectable()
export class GeneralService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Subscription.name)
    private subsModel: Model<SubscriptionDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async overview(): Promise<IReturnObject> {
    try {
      const users = await this.userModel.find();
      const comments = await this.commentModel.find();
      const subs = await this.subsModel.find();
      let total = 0;

      for (let i = 0; i < subs.length; i++) {
        total += subs[i].amount;
      }

      return Return({
        error: false,
        statusCode: 200,
        data: {
          users: users.length,
          comments: comments.length,
          totalSubs: total,
        },
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

  async vendors(): Promise<IReturnObject> {
    try {
      const allusers = await this.userModel.find();
      const approved = await this.userModel.find({ blocked: false });
      const blocked = await this.userModel.find({ blocked: true });

      return Return({
        error: false,
        statusCode: 200,
        data: {
          users: allusers.length,
          approved: approved.length,
          blocked: blocked.length,
        },
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

  async comments(): Promise<IReturnObject> {
    try {
      const comment = await this.commentModel.find();
      const approved = await this.commentModel.find({ reviewed: true });
      let avg = 0;
      let total = 0;

      if (comment.length < 1) {
        return Return({
          error: false,
          statusCode: 200,
          data: {
            comments: comment.length,
            approved: approved.length,
            average: 0,
          },
        });
      }
      for (let i = 0; i < comment.length; i++) {
        total += comment[i].rating;
      }

      avg = total / comment.length;

      return Return({
        error: false,
        statusCode: 200,
        data: {
          comments: comment.length,
          approved: approved.length,
          average: avg.toFixed(1),
        },
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
}
