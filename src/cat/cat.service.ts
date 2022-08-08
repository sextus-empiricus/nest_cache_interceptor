import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Cat } from './cat.entity';
import { GetAllCatsResponse } from '../../types/cat/cat.responses';
import { ResponseStatus } from '../../types/general/response';

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
}
