import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CustomCache } from './custom-cache.entity';
import { InsertCacheDataDto } from './dto/custom-cache.dto';

@Injectable()
export class CustomCacheService {
   constructor(@Inject(DataSource) private dataSource: DataSource) {}

   async findCacheData(
      controller: string,
      method: string,
   ): Promise<CustomCache | null> {
      return await this.dataSource
         .createQueryBuilder()
         .select('custom_cache')
         .from(CustomCache, 'custom_cache')
         .where(
            'custom_cache.controller = :controller AND custom_cache.method = :method',
            {
               controller,
               method,
            },
         )
         .getOne();
   }

   async insertCacheData({
      controller,
      method,
      data,
   }: InsertCacheDataDto): Promise<boolean> {
      try {
         await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(CustomCache)
            .values({ controller, method, value: JSON.stringify(data) })
            .execute();
         return true;
      } catch (e) {
         return false;
      }
   }

   async removeCacheDataById(id: string): Promise<void> {
      await this.dataSource
         .createQueryBuilder()
         .delete()
         .from(CustomCache, 'custom_cache')
         .where('custom_cache.id = :id', { id })
         .execute();
   }
}
