import {
  Controller,
  Res,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CrudService } from '../services/crud/crud.service';
import { NotificationsService } from '../services/notifications/notifications.service';
import { Response } from 'express';
import { Admin } from 'src/Schema/Admin.Schema';
import { ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(
    private crudService: CrudService,
    private notificationService: NotificationsService,
  ) {}

  @ApiTags('ADMIN')
  @Get('')
  async getAllAdmin(@Res() res: Response) {
    const result = await this.crudService.getAllAdmin();
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN')
  @Get('notifications')
  async getAllNotifications(@Res() res: Response) {
    const result = await this.notificationService.getAllNotifications();
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN')
  @ApiParam({ type: String, name: 'id' })
  @Get(':id')
  async getAdmin(@Res() res: Response, @Param() param: { id: string }) {
    const result = await this.crudService.getAdminByID(param.id);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN')
  @ApiBody({ type: Admin })
  @Post('createaccount')
  async createAdmin(@Res() res: Response, @Body() body: Admin) {
    const result = await this.crudService.createAdmin(body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN')
  @ApiBody({ type: Admin })
  @Post('login')
  async loginAdmin(@Res() res: Response, @Body() body: Admin) {
    const result = await this.crudService.login(body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN')
  @ApiParam({ type: String, name: 'id' })
  @ApiBody({ type: Admin })
  @Put(':id')
  async updateAdmin(
    @Res() res: Response,
    @Param() param: { id: string },
    @Body() body: Admin,
  ) {
    const result = await this.crudService.updateAdminByID(param.id, body);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN')
  @ApiParam({ type: String, name: 'id' })
  @Delete(':id')
  async deleteAdmin(@Res() res: Response, @Param() param: { id: string }) {
    const result = await this.crudService.deleteAdminByID(param.id);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('ADMIN')
  @ApiParam({ type: String, name: 'id' })
  @Delete('notification/:id')
  async deleteNotification(
    @Res() res: Response,
    @Param() param: { id: string },
  ) {
    const result = await this.notificationService.deleteNotification(param.id);
    res.status(result.statusCode).send(result);
  }
}
