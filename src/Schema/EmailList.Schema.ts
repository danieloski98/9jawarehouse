import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type EmailListDocument = EmailList & Document;

@Schema()
export class EmailList {
  @ApiProperty()
  @Prop({
    required: true,
    trim: true,
  })
  email: string;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date(Date.now()).toISOString(),
  })
  created_at: string;
}

export const EmailListSchema = SchemaFactory.createForClass(EmailList);
