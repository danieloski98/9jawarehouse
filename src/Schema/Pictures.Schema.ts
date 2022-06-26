import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type PictureDocument = Picture & Document;

@Schema()
export class Picture {
  @ApiProperty()
  @Prop()
  user_id: string;

  @ApiProperty()
  @Prop({
    type: [String],
    default: [],
  })
  pictures: string[];

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
}

export const PictureSchema = SchemaFactory.createForClass(Picture);
