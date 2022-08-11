import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Inject, UseGuards, UseInterceptors } from '@nestjs/common';
import { SetCustomTimeout } from '../decorators/set-custom-timeout.decorator';
import { CatService } from './cat.service';
import { CustomCacheInterceptor } from '../interceptors/custom-cache.interceptor';
import { GetAllCatsResponse } from '../../types/cat/cat.responses';
import { UserObject } from '../decorators/user-object.decorator';
import { User } from '../user/entities/user.entity';

@Controller('cat')
export class CatController {
   constructor(@Inject(CatService) private catService: CatService) {}

   @Get('/')
   @UseGuards(AuthGuard('jwt'))
   @SetCustomTimeout(5000)
   @UseInterceptors(CustomCacheInterceptor)
   async getAllCats(
      @UserObject()  user: User
   ): Promise<GetAllCatsResponse> {
      console.log(user);
      return await this.catService.getAllCats();
   }
}
