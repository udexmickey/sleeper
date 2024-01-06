import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interface/tokenPayload';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          // make the last property 'Authentication' is the name of the set cookie on sign in
          return request?.cookies?.Authentication || request?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  //This line helps to verify the token of admin that just signed
  public async validate(payload: TokenPayload): Promise<unknown> {
    // get the authenticated user by id from the token in the cookie/Authentication request headers
    return await this.usersService.findOne(payload.userId);
  }
}
