import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ProfilePicDocument = ProfilePic & Document;

@Schema()
export class ProfilePic {
  @ApiProperty()
  @Prop()
  user_id: string;

  @ApiProperty()
  @Prop({
    type: String,
    default: '',
  })
  picture: string;

  @ApiProperty()
  @Prop({
    type: Boolean,
    default: false,
  })
  approved: boolean;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date().toLocaleString(),
  })
  created_at: string;
}

export const ProfilePicSchema = SchemaFactory.createForClass(ProfilePic);
