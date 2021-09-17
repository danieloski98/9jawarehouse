import { User, UserDocument } from 'src/Schema/User.schema';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Return } from 'src/utils/Returnfunctions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsercheckMiddleware implements NestMiddleware {
  private logger = new Logger('UserCheckMiddleWare');
  constructor(@InjectModel(User.name) private userRepo: Model<UserDocument>) {}
  async use(req: Request, res: Response, next: () => void) {
    // get token
    // check header
    const authorization = req.headers['authorization'];

    if (authorization === undefined || authorization === null) {
      const payload = Return({
        error: true,
        statusCode: 401,
        errorMessage: 'UNAUTHORIZED REQUEST',
      });
      res.status(payload.statusCode).send(payload);
      return;
    }
    // decode string
    const token = req.headers['authorization'].split(' ')[1];

    try {
      // verify the token
      const verifiedtoken: Partial<UserDocument> = verify(token, 'EAZICRED', {
        algorithms: ['HS256'],
      }) as any;
      // check the user id
      if (verifiedtoken._id === undefined) {
        const payload = Return({
          error: true,
          statusCode: 401,
          errorMessage: 'UNAUTHORIZED REQUEST',
        });
        res.status(payload.statusCode).send(payload);
        return;
      }
      const user = await this.userRepo.findOne({
        where: { id: verifiedtoken.id },
      });

      if (user === undefined) {
        const payload = Return({
          error: true,
          statusCode: 400,
          errorMessage: 'User Not Found',
        });
        res.status(payload.statusCode).send(payload);
        return;
      }
      req['user'] = verifiedtoken.id;
      next();
    } catch (error) {
      const payload = Return({
        error: true,
        statusCode: 401,
        errorMessage: 'UNAUTHORIZED REQUEST',
        trace: error,
      });

      res.status(payload.statusCode).send(payload);
      return;
    }
  }
}
