import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    type: String,
  })
  @ApiProperty({
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  @ApiProperty({
    type: String,
  })
  password: string;

  @Prop({
    required: true,
    type: String,
  })
  @ApiProperty({
    type: String,
  })
  phone: string;

  @Prop({
    required: true,
    type: String,
  })
  @ApiProperty({
    type: String,
  })
  first_name: string;

  @Prop({
    required: true,
    type: String,
  })
  @ApiProperty({
    type: String,
  })
  last_name: string;

  @Prop({
    required: true,
    type: String,
  })
  @ApiProperty({
    type: Boolean,
  })
  @Prop({
    type: Boolean,
    default: false,
  })
  verified: boolean;

  @ApiProperty({
    type: String,
  })
  @Prop({
    type: String,
    default: new Date().toISOString(),
  })
  createAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
