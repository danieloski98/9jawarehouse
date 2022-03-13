import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { CrudService } from './services/crud/crud.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/Schema/Admin.Schema';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [AdminController],
  providers: [CrudService, UserService],
})
export class AdminModule {}
