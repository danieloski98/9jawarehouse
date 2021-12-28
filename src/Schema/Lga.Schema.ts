import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type LgaDocument = Lga & Document;

@Schema()
export class Lga {
  @ApiProperty()
  @Prop()
  Country: string;

  @ApiProperty()
  @Prop()
  State: string;

  @ApiProperty()
  @Prop()
  LGA: string;

  @ApiProperty()
  @Prop()
  SenDistrict: string;

  @ApiProperty()
  @Prop()
  SenDistrictCode: string;

  @ApiProperty()
  @Prop()
  Shape_Length: string;

  @ApiProperty()
  @Prop()
  Shape_Area: string;
}

export const LgaSchema = SchemaFactory.createForClass(Lga);
