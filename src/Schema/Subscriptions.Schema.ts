import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
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
  amount: number;

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

  @ApiProperty()
  @Prop({
    type: String,
    default: '',
  })
  reference_id: string;

  @ApiProperty()
  @Prop({
    type: String,
    default: '',
  })
  access_code: string;

  @Prop({
    type: Number,
    default: 1,
  })
  status: number;

  @ApiProperty()
  @Prop({
    type: Date,
    default: new Date().toISOString(),
  })
  created_at: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
