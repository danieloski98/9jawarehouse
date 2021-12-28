import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type StateDocument = State & Document;

@Schema()
export class State {
  @ApiProperty()
  @Prop()
  officialName: string;

  @ApiProperty()
  @Prop()
  Governor: string;

  @ApiProperty()
  @Prop()
  DeputyGovernor: string;

  @ApiProperty()
  @Prop()
  Population: number;

  @ApiProperty()
  @Prop()
  Slogan: string;

  @ApiProperty()
  @Prop()
  Capital: string;

  @ApiProperty()
  @Prop()
  Area: number;

  @ApiProperty()
  @Prop()
  Latitude: string;

  @ApiProperty()
  @Prop()
  Longitude: string;

  @ApiProperty()
  @Prop()
  Number_of_LGAS: string;

  @ApiProperty()
  @Prop()
  Date_created: string;

  @ApiProperty()
  @Prop()
  Website: string;
}

export const StateSchema = SchemaFactory.createForClass(State);
