import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  invoiceId: string;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
