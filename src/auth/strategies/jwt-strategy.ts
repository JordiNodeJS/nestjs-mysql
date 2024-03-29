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
  /* El nombre del método validate es una convención de Passport.js.
  Cuando se utiliza una estrategia de Passport, Passport.js busca y
  ejecuta automáticamente un método llamado validate en la estrategia.

  Si cambias el nombre del método validate a otro nombre como validator,
  Passport.js no podrá encontrar el método validate y no podrá ejecutar
  la lógica de validación que has definido. Como resultado, la autenticación 
  no funcionará correctamente. */
  async validate(payload: any) {
    return { user: payload.user, sub: payload.sub };
  }
}
