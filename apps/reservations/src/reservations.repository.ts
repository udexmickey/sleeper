import { AbstractRepository } from '@app/common/database';
import { Injectable, Logger } from '@nestjs/common';
import { Reservation } from './reservations/models/reservation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReservationsRepository extends AbstractRepository<Reservation> {
  [x: string]: any;
  protected readonly logger = new Logger(Reservation.name);

  constructor(
    @InjectModel(Reservation.name)
    reservationModel: Model<Reservation>,
  ) {
    super(reservationModel);
  }
}
