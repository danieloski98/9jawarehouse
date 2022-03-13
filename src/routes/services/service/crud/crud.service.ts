import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from 'src/Schema/Services.Schema';
import { Return } from 'src/utils/Returnfunctions';
import { IReturnObject } from 'src/utils/ReturnObject';

@Injectable()
export class CrudService {
  private logger = new Logger('Service:Crud');
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  async createService(
    payload: Partial<ServiceDocument>,
  ): Promise<IReturnObject> {
    try {
      // check if a service already exist with that same name
      const name = payload.name.toLowerCase().replace(/[\/$@:]/g, ' ');
      const exist = await this.serviceModel.find({ name });
      if (exist.length >= 1) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Service with that name already exisit',
        });
      }

      // create the service
      const newService = await this.serviceModel.create({ name });
      this.logger.log(newService);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: 'Service Created',
      });
    } catch (error) {
      this.logger.error(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  async getAllServices(): Promise<IReturnObject> {
    try {
      const services = await this.serviceModel.find();
      return Return({
        error: false,
        statusCode: 200,
        successMessage:
          services.length > 0
            ? 'list of services returned'
            : 'no service created',
        data: services,
      });
    } catch (error) {
      this.logger.error(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  async deleteService(id: string): Promise<IReturnObject> {
    try {
      // check if a service exist with that id
      const serviceExist = await this.serviceModel.findById(id);
      if (serviceExist === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Service does not exisit',
        });
      }

      // update the service
      const updated = await this.serviceModel.deleteOne({ _id: id });
      this.logger.log(updated);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: `service with id ${id} deleted`,
      });
    } catch (error) {
      this.logger.error(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }

  async editService(id: string, service: string): Promise<IReturnObject> {
    try {
      // check if a service exist with that id
      const serviceExist = await this.serviceModel.findById(id);
      if (serviceExist === null) {
        return Return({
          error: true,
          statusCode: 400,
          errorMessage: 'Service does not exisit',
        });
      }

      // update the service
      const updated = await this.serviceModel.updateOne(
        { _id: id },
        { name: service },
      );
      this.logger.log(updated);
      return Return({
        error: false,
        statusCode: 200,
        successMessage: `service with id ${id} deleted`,
      });
    } catch (error) {
      this.logger.error(error);
      return Return({
        error: true,
        statusCode: 500,
        errorMessage: 'Internal Server Error',
        trace: error,
      });
    }
  }
}
