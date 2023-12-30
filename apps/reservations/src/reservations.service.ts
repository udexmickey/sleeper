import { HttpException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './reservations/dto/create-reservation.dto';
import { UpdateReservationDto } from './reservations/dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}
  async create(createReservationDto: CreateReservationDto) {
    try {
      return await this.reservationsRepository.create({
        ...createReservationDto,
        userId: '12334',
        // timestamps: new Date(),
      });
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async findAll() {
    try {
      return await this.reservationsRepository.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async findOne(id: string) {
    try {
      return await this.reservationsRepository.findOne({ _id: id });
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    try {
      return await this.reservationsRepository.findOneAndUpdate(
        {
          _id: id,
        },
        {
          ...updateReservationDto,
        },
      );
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async remove(id: string) {
    try {
      return await this.reservationsRepository.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }
}
