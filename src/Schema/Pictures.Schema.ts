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
    type: String,
    default: new Date(Date.now()).toISOString(),
  })
  created_at: string;
}

export const PictureSchema = SchemaFactory.createForClass(Picture);
