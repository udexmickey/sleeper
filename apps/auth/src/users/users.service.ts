import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.create(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.findAll({});
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ _id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.findOneAndUpdate(
        { _id: id },
        { $set: updateUserDto },
      );
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async remove(id: string) {
    try {
      return await this.userRepository.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }
}
