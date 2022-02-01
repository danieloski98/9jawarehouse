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
    required: false,
    type: String,
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
  passwordless: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @Prop({
    type: Boolean,
    default: true,
  })
  blocked: boolean;

  @ApiProperty({
    type: Boolean,
  })
  @Prop({
    type: Boolean,
    default: true,
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
    type: [String],
  })
  lga: string;

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  country: string;

  @Prop({
    required: false,
    type: String,
    default: '',
  })
  @ApiProperty({
    type: String,
  })
  state: string;

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
    type: Boolean,
    default: false,
  })
  @ApiProperty({
    type: Boolean,
  })
  pin: boolean;

  @Prop({
    required: false,
    type: Array,
    default: [],
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
    default: '',
  })
  nextPayment: string;

  @ApiProperty({
    type: Number,
  })
  @Prop({
    type: Number,
    default: 0,
  })
  rating: number;

  @ApiProperty({
    type: String,
  })
  @Prop({
    type: String,
    default: '',
  })
  verification_document_type: string;

  @ApiProperty({
    type: String,
  })
  @Prop({
    type: String,
    default: '',
  })
  verification_document: string;

  @ApiProperty({
    type: String,
  })
  @Prop({
    type: String,
    default: '',
  })
  CAC: string;

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
