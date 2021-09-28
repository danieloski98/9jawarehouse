import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type TestDocument = Test & Document;

@Schema()
export class Test {
  @ApiProperty()
  @Prop({
    required: true,
  })
  user_id: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  date_taken: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  facility: string;

  @ApiProperty({
    description: '0=negative, 1=positive',
  })
  @Prop({
    required: true,
  })
  result: number;

  @ApiProperty({
    description:
      'this should be a base64 image string of the test result image',
  })
  @Prop({
    required: true,
  })
  link: string;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date().toUTCString(),
  })
  created_at: string;
}

export const TestSchema = SchemaFactory.createForClass(Test);
