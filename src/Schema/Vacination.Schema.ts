import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type VacinationDocument = Vacination & Document;
export type VacineDocument = Vacine & Document;

@Schema()
class Vacine {
  @ApiProperty()
  @Prop()
  date_taken: string;

  @ApiProperty()
  @Prop()
  facility: string;

  @ApiProperty()
  @Prop()
  manufacturer: string;
}

export const vacineSchema = SchemaFactory.createForClass(Vacine);

@Schema()
export class Vacination {
  @ApiProperty()
  @Prop()
  user_id: string;

  @ApiProperty()
  @Prop()
  image_link: string;

  @ApiProperty({
    type: [Vacine],
  })
  @Prop({
    type: [vacineSchema],
    required: false,
    default: null,
  })
  vacinations: Vacine[];

  @ApiProperty()
  @Prop({
    type: String,
    default: new Date().toUTCString(),
  })
  created_at: string;
}

export const VacinationSchema = SchemaFactory.createForClass(Vacination);
