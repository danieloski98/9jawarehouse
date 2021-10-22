import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @ApiProperty()
  @Prop({
    default: '',
  })
  fullname: string;

  @ApiProperty()
  @Prop({
    default: '',
  })
  email: string;

  @ApiProperty()
  @Prop({
    default: '',
  })
  message: string;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date().toISOString(),
  })
  created_at: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
