import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type PINDocument = PIN & Document;

@Schema()
export class PIN {
  @ApiProperty()
  @Prop({
    required: true,
  })
  business_id: string;

  @ApiProperty()
  @Prop({
    required: false,
    default: 0,
  })
  use_count: number;

  @ApiProperty()
  @Prop({
    required: true,
  })
  code: string;

  @ApiProperty()
  @Prop({
    required: true,
    default: true,
  })
  active: boolean;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date().toISOString(),
  })
  updated_at: string;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date().toISOString(),
  })
  created_at: string;
}

export const PINSchema = SchemaFactory.createForClass(PIN);
