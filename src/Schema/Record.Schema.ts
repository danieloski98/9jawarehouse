import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type RecordDocument = Record & Document;

@Schema()
export class Record {
  @ApiProperty()
  @Prop()
  user_id: string;

  @ApiProperty()
  @Prop({
    type: [String],
    default: [],
  })
  images: string[];

  @ApiProperty()
  @Prop({
    type: String,
    default: '',
  })
  profilePic: string;

  @ApiProperty()
  @Prop({
    type: Boolean,
    default: false,
  })
  approved: boolean;

  @ApiProperty()
  @Prop({
    type: Date,
    default: new Date().toISOString(),
  })
  created_at: Date;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date().toLocaleString(),
  })
  updated_at: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
