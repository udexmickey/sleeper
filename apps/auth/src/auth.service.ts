import { BadGatewayException, Injectable } from '@nestjs/common';
import { User } from './users/models/user.schema';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interface/tokenPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return 'Welcome to the auth service';
  }

  async signToken(user: User) {
    const tokenPayload: TokenPayload = {
      userId: await user._id.toHexString(),
    };

    const token = this.jwtService.sign(tokenPayload);

    if (token === undefined || token === null)
      throw new BadGatewayException('Jwt Token not found');

    return token;
  }

  async storeCookieWithJwtAccessToken(response: Response, token: string) {
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRE_TIME'),
    );

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
      // secure: this.configService.get('NODE_ENV') === 'production',
    });
  }

  async login(user: User, response: Response) {
    try {
      // generate JWT
      const token = await this.signToken(user);

      //This will set the cookie in the response
      await this.storeCookieWithJwtAccessToken(response, token);

      // return user with valid access token
      return response.send(user).json();
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
}
