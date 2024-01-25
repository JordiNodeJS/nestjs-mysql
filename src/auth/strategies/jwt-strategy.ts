import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../constants';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // we extract the token from the header
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, // we pass the secret we use to sign the token
    });
  }

  async validate(payload: any) {
    return { user: payload.user, sub: payload.sub };
  }
}
