import { DataSource } from 'typeorm';
import { Cat } from './cat.entity';
import { GetAllCatsResponse } from '../../types/cat/cat.responses';
import { ResponseStatus } from '../../types/general/response';
import { CreateCatDto } from './dto/cat.dto';
import { MulterDiskUploadedFilesInterface } from '../../types/files';
import { Response } from 'express';
import { Inject, Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';
import { storageDir } from '../utils/storageDir';
import { join } from 'path';
import * as path from 'path';

@Injectable()
export class CatService {
   constructor(@Inject(DataSource) private dataSource: DataSource) {}

   async getAllCats(): Promise<GetAllCatsResponse> {
      try {
         const cats = await this.dataSource
            .createQueryBuilder()
            .select('cat')
            .from(Cat, 'cat')
            .getMany();

         return {
            status: ResponseStatus.success,
            cats,
         };
      } catch (e) {
         return {
            status: ResponseStatus.failed,
            message: e.message,
         };
      }
   }

   async createCat(
      data: CreateCatDto,
      photo: MulterDiskUploadedFilesInterface,
   ) {
      const photoFile = photo?.photo?.[0] ?? null;
      try {
         // throw new Error('Removing uploaded file in error case - test.');
         await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Cat)
            .values({
               ...data,
               photoFn: photoFile?.filename ?? null,
            })
            .execute();
      } catch (e) {
         if (photoFile) {
            try {
               unlinkSync(join(storageDir(), 'cat-photos', photoFile.filename));
            } catch (e2) {}
            throw e;
         }
      }
   }

   async getCatPhoto(id: string, res: Response) {
      try {
         const targetCat = await this.dataSource
            .createQueryBuilder()
            .select('cat')
            .from(Cat, 'cat')
            .where('cat.id = :id', { id })
            .getOne();

         if (!targetCat) {
            throw new Error('Target cat entity not found.');
         }

         if (!targetCat.photoFn) {
            throw new Error(
               'Targeted cat entity does not have related photo file.',
            );
         }

         res.sendFile(targetCat.photoFn, {
            root: path.join(storageDir(), 'cat-photos'),
         });
      } catch (e) {
         res.json({
            message: 'e.message,',
         });
      }
   }
}
