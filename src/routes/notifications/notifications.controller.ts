import { Controller, Delete, Get, Param, Put, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { NotificationUserService } from './services/user/user.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private UserNotificationService: NotificationUserService) {}

  @ApiTags('NOTIFICATIONS')
  @ApiParam({ name: 'business_id' })
  @Get(':business_id')
  async getNotifications(@Res() res: Response, @Param() param: any) {
    const result = await this.UserNotificationService.getNotifications(
      param['business_id'],
    );
    res.status(result.statusCode).send(result);
  }

  @ApiTags('NOTIFICATIONS')
  @ApiParam({ name: 'id' })
  @Put(':id')
  async markAsRead(@Res() res: Response, @Param() param: any) {
    const result = await this.UserNotificationService.markAsRead(param['id']);
    res.status(result.statusCode).send(result);
  }

  @ApiTags('NOTIFICATIONS')
  @ApiParam({ name: 'id' })
  @Delete(':id')
  async deleteNotification(@Res() res: Response, @Param() param: any) {
    const result = await this.UserNotificationService.deleteNotification(
      param['id'],
    );
    res.status(result.statusCode).send(result);
  }
}
