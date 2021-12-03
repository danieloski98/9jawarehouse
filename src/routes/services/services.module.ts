import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from 'src/Schema/Services.Schema';
import { ServicesController } from './services.controller';
import { CrudService } from './service/crud/crud.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]),
  ],
  controllers: [ServicesController],
  providers: [CrudService],
})
export class ServicesModule {}
