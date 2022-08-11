import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RegisterDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObject } from '../decorators/user-object.decorator';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('/login')
   async register(
      @Body() req: RegisterDto,
      @Res() res: Response,
   ): Promise<any> {
      await this.authService.login(req, res);
   }

   @Get('/logout')
   @UseGuards(AuthGuard('jwt'))
   async logout(@UserObject() user: User, @Res() res: Response) {
      return await this.authService.logout(user, res);
   }
}
