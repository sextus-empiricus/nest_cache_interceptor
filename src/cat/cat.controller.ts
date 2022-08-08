import { Controller, Get, Inject } from '@nestjs/common';
import { CatService } from './cat.service';
import { GetAllCatsResponse } from '../../types/cat/cat.responses';

@Controller('cat')
export class CatController {
   constructor(@Inject(CatService) private catService: CatService) {}

   @Get('/')
   async getAllCats(): Promise<GetAllCatsResponse> {
      return await this.catService.getAllCats();
   }
}
