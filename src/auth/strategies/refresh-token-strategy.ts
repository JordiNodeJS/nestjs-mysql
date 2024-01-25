import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../../constants';

export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshing'), // we extract the token from the header
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, // we pass the secret we use to sign the token
    });
  }

  async validate(payload: any) {
    return { user: payload.user, sub: payload.sub };
  }
}
