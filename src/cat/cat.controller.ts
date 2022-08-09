import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { SetCustomTimeout } from '../decorators/set-custom-timeout.decorator';
import { CatService } from './cat.service';
import { GetAllCatsResponse } from '../../types/cat/cat.responses';
import { CustomCacheInterceptor } from '../interceptors/custom-cache.interceptor';

@Controller('cat')
export class CatController {
   constructor(@Inject(CatService) private catService: CatService) {}

   @Get('/')
   @SetCustomTimeout(5000)
   @UseInterceptors(CustomCacheInterceptor)
   async getAllCats(): Promise<GetAllCatsResponse> {
      return await this.catService.getAllCats();
   }
}
