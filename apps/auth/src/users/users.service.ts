import {
  HttpException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
  // UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async varifyUser(email: string, password: string) {
    // The verifyUser method IS used to verify a user during login and local strategy verification. it will throw an error if the user is not found or the password is wrong
    // DURING (Login)
    try {
      const user = await this.userRepository.findOne(
        { email },
        'password email', // BY default password won't be returned so we overwrite the schema select false property to true
      );
      const isMatchPassword = await bcrypt.compare(password, user.password);
      // if (!user) {
      //   throw new UnprocessableEntityException('Invalid credentials');
      // }
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      if (!isMatchPassword) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async create(createUserDto: CreateUserDto) {
    // try {
    await this.validateUserEmail(createUserDto);

    return await this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    // } catch (error) {
    //   throw new HttpException(error.message, error.statusCode);
    // }
  }

  async validateUserEmail(createUserDto: CreateUserDto) {
    // The validateUserEmail method will throw an error if a new user tries to create an account with an email that already exists
    // DURING (Registration)
    try {
      await this.userRepository.findOne({ email: createUserDto.email });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException(
      `User with email '${createUserDto.email}' already exists`,
    ).getResponse();
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
