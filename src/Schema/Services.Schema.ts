import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date(Date.now()).toISOString(),
  })
  created_at: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
