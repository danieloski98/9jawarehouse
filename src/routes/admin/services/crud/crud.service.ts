import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDocument, Admin } from 'src/Schema/Admin.Schema';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';
import { sign } from 'jsonwebtoken';
import { compare, compareSync, genSaltSync, hash } from 'bcrypt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class CrudService {
  private logger = new Logger('CRUDSERVICEADMIN');
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async createAdmin(admin: Partial<Admin>): Promise<IReturnObject> {
    try {
      this.logger.log(admin);
      const exists = await this.adminModel.find({ email: admin.email });
      if (exists.length > 0) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Email already in use',
        });
      }
      // check password length
      if (admin.password.length < 8) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Password too short',
        });
      }

      if (admin.permissions && admin.permissions.length < 1) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Admin needs at least 1 permission',
        });
      } else if (!admin.permissions) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Admin needs at least 1 permission',
        });
      }

      const hashedPassword = await this.generateHashedPassword(admin.password);
      admin.password = hashedPassword;
      const newAdmin = await this.adminModel.create(admin);
      console.log(newAdmin);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Admin created successfully',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error',
        trace: error,
      });
    }
  }

  async login(admin: Partial<Admin>): Promise<IReturnObject> {
    try {
      const email = await this.adminModel.find({ email: admin.email });
      if (email.length < 1) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Email oe password incorrect',
        });
      }
      // compare the password
      const match = await compare(admin.password, email[0].password);
      if (!match) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Email oe password incorrect',
        });
      }
      // generate token
      const token = await this.generateJWT(admin);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Login Succesful',
        data: {
          admin: email[0],
          token,
        },
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error',
        trace: error,
      });
    }
  }

  async getAdminByID(id: string): Promise<IReturnObject> {
    try {
      const admin = await this.adminModel.findById({ _id: id });
      if (admin === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Admin not found',
        });
      } else {
        return Return({
          error: false,
          statusCode: 200,
          successMessage: 'Admin found',
          data: admin,
        });
      }
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error',
        trace: error,
      });
    }
  }

  async getAllAdmin(): Promise<IReturnObject> {
    try {
      const admins = await this.adminModel.find();
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Admin found',
        data: admins,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error',
        trace: error,
      });
    }
  }

  async deleteAdminByID(id: string): Promise<IReturnObject> {
    try {
      const admin = await this.adminModel.deleteOne({ _id: id });
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Admin deleted',
        data: admin,
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error',
        trace: error,
      });
    }
  }

  async updateAdminByID(
    id: string,
    details: Partial<Admin>,
  ): Promise<IReturnObject> {
    try {
      const admin = await this.adminModel.findById(id);
      this.logger.log(admin);
      if (admin === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'admin not found',
        });
      }
      // update the admin
      delete details.picture;
      const update = await this.adminModel.updateOne(
        { _id: id },
        { ...details },
      );
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'updated!',
      });
    } catch (error) {
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server error',
        trace: error,
      });
    }
  }

  public async generateJWT(payload: Partial<Admin | any>): Promise<string> {
    this.logger.warn(payload);
    const JWT = sign(payload, process.env.ENCRYPTION_KEY, {
      algorithm: 'HS256',
      expiresIn: '5h',
    });
    return JWT;
  }

  public async generateHashedPassword(password: string): Promise<string> {
    const salt = genSaltSync(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }
}
