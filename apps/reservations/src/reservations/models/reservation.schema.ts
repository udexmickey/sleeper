import { AbstractDocument } from '@app/common/database';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Reservation extends AbstractDocument {
  //   @Prop()
  //   timestamps: Date;

  @Prop()
  invoiceId: string;

  @Prop()
  userId: string;

  @Prop()
  placeId: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
