import {
   Body,
   Controller,
   Get,
   Inject,
   Param,
   Post,
   Res,
   UploadedFiles,
   UseInterceptors,
} from '@nestjs/common';
import { SetCustomTimeout } from '../decorators/set-custom-timeout.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { storageDir } from '../utils/storageDir';
import { CatService } from './cat.service';
import { GetAllCatsResponse } from '../../types/cat/cat.responses';
import { CustomCacheInterceptor } from '../interceptors/custom-cache.interceptor';
import { CreateCatDto } from './dto/cat.dto';
import { MulterDiskUploadedFilesInterface } from '../../types/files';
import { Response } from 'express';
import { multerStorage } from '../utils/storage';

@Controller('cat')
export class CatController {
   constructor(@Inject(CatService) private catService: CatService) {}

   @Get('/')
   @SetCustomTimeout(5000)
   @UseInterceptors(CustomCacheInterceptor)
   async getAllCats(): Promise<GetAllCatsResponse> {
      return await this.catService.getAllCats();
   }

   @Post('/')
   @UseInterceptors(
      FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }], {
         storage: multerStorage(join(storageDir(), 'cat-photos')),
      }),
   )
   async createCat(
      @Body() data: CreateCatDto,
      @UploadedFiles() photo: MulterDiskUploadedFilesInterface,
   ) {
      await this.catService.createCat(data, photo);
   }

   @Get('/photo/:catId')
   async getCatPhoto(@Param('catId') catId: string, @Res() res: Response) {
      await this.catService.getCatPhoto(catId, res);
   }
}
