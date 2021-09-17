import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [],
})
export class AdminModule {}
