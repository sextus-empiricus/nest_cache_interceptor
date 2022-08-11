import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { RegisterDto } from './dto/auth.dto';
import { Response } from 'express';
import { User } from '../user/entities/user.entity';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt-strategy';
import { config } from '../../config/config';

@Injectable()
export class AuthService {
   private createToken(currentTokenId: string): {
      accessToken: string;
      expiresIn: number;
   } {
      const payload: JwtPayload = { id: currentTokenId };
      const expiresIn = 60 * 60 * 24;
      const accessToken = sign(payload, config.jwt.secretKey, { expiresIn });
      return {
         accessToken,
         expiresIn,
      };
   }

   private async generateToken(user: User): Promise<string> {
      let token;
      let userWithThisToken = null;
      do {
         token = uuid();
         userWithThisToken = await User.findOne({
            where: { currentTokenId: token },
         });
      } while (!!userWithThisToken);
      {
         user.currentTokenId = token;
         await user.save();
      }
      return token;
   }

   async login(req: RegisterDto, res: Response): Promise<any> {
      try {
         //check user data:
         const targetUser = await User.findOne({ where: { email: req.email } });

         if (!targetUser) {
            return res.json('Invalid email or password.');
         }

         const isPasswordCorrect = await compare(
            req.password,
            targetUser.password,
         );

         if (!isPasswordCorrect) {
            return res.json('Invalid email or password.');
         }

         //generate token:
         const token = this.createToken(await this.generateToken(targetUser));

         //response:
         res.cookie('jwt', token.accessToken, {
            secure: false,
            domain: 'localhost',
            httpOnly: true,
         }).json({
            ok: true,
         });
      } catch (e) {
         res.json({ error: e.message });
      }
   }

   async logout(user: User, res: Response) {
      try {
         user.currentTokenId = null;
         await user.save();
         res.clearCookie('jwt', {
            secure: false,
            domain: 'localhost',
            httpOnly: true,
         });

         return res.json({ ok: true });
      } catch (e) {
         return res.json({ error: e.message });
      }
   }
}
