import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { config } from '../../config/config';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

export interface JwtPayload {
   id: string;
}

const cookieExtractor = (req: any): null | string => {
   return req && req.cookies ? req.cookies?.jwt ?? null : null;
};

export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor() {
      super({
         jwtFromRequest: cookieExtractor,
         secretOrKey: config.jwt.secretKey,
      });
   }

   async validate(payload: JwtPayload, done: (error, user) => void) {
      if (!payload || !payload.id) {
         return done(new UnauthorizedException(), false);
      }
      const targetUser = await User.findOne({
         where: { currentTokenId: payload.id },
      });
      if (!targetUser) {
         return done(new UnauthorizedException(), false);
      }

      done(null, targetUser);
   }
}
