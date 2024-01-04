import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' }); // this will log the email to the terminal if login fails
  }

  async validate(email: string, password: string) {
    try {
      return await this.usersService.varifyUser(email, password);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
