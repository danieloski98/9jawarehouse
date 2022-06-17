import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema()
export class Otp {
  @ApiProperty()
  @Prop()
  user_id: string;

  @ApiProperty()
  @Prop()
  code: number;

  @ApiProperty()
  @Prop({
    default: false,
  })
  expired: boolean;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date(Date.now()).toISOString(),
  })
  created_at: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
