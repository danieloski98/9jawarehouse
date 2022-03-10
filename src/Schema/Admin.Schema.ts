import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { ADMINTYPE } from 'src/utils/enums/AdminType';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @ApiProperty()
  @Prop()
  fullname: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop({
    required: true,
    enum: ADMINTYPE,
  })
  type: number;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty({
    type: [String],
  })
  @Prop({
    type: [String],
  })
  permissions: string[];

  @ApiProperty({
    type: String,
  })
  @Prop({
    type: String,
  })
  picture: string;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date().toUTCString(),
  })
  created_at: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
