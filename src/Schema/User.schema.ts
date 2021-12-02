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
    required: false,
    type: String,
  })
  @ApiProperty({
    type: String,
  })
  password: string;

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  phone: string;

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  first_name: string;

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  last_name: string;

  @ApiProperty({
    type: Boolean,
  })
  @Prop({
    type: Boolean,
    default: false,
  })
  verified: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @Prop({
    type: Boolean,
    default: false,
  })
  enabled: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @Prop({
    type: Boolean,
    default: false,
  })
  passwordless: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @Prop({
    type: Boolean,
    default: false,
  })
  blocked: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean;

  @Prop({
    required: true,
    type: String,
  })
  @ApiProperty({
    type: String,
  })
  username: string;

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  business_address: string;

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  profile_pic: string;

  @Prop({
    required: false,
    type: [String],
  })
  @ApiProperty({
    type: [String],
  })
  pictures: string[];

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  business_name: string;

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  business_description: string;

  @Prop({
    required: false,
    type: [String],
    default: [],
  })
  @ApiProperty({
    type: [String],
  })
  services: string[];

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  facebook: string;

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  linkedin: string;

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  instagram: string;

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  twitter: string;

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  whatsapp: string;

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  website: string;

  @Prop({
    required: false,
    type: Array,
  })
  @ApiProperty({
    type: Array,
  })
  certificates: any[];

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
