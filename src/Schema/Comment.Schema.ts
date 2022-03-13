import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @ApiProperty()
  @Prop({
    type: String,
    default: '',
  })
  business_id: string;

  @ApiProperty()
  @Prop({
    type: Number,
    default: 0,
  })
  rating: number;

  @ApiProperty()
  @Prop({
    type: String,
    default: '',
  })
  comment: string;

  @ApiProperty()
  @Prop({
    type: String,
    default: '',
  })
  fullname: string;

  @ApiProperty()
  @Prop({
    type: String,
    default: '',
  })
  email: string;

  @Prop({
    type: [String],
    default: [],
  })
  pictures: string[];

  @Prop({
    type: Boolean,
    default: false,
  })
  reviewed: boolean;

  @ApiProperty()
  @Prop({
    type: Date,
    default: new Date().toISOString(),
  })
  created_at: Date;

  @ApiProperty()
  @Prop({
    type: Date,
    default: new Date().toISOString(),
  })
  updated_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
