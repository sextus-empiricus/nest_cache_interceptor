import {
   Inject,
   CallHandler,
   ExecutionContext,
   NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { CustomCacheService } from '../custom-cache/custom-cache.service';
import { Reflector } from '@nestjs/core';

export class CustomCacheInterceptor implements NestInterceptor {
   constructor(
      @Inject(CustomCacheService) private cacheService: CustomCacheService,
      private reflector: Reflector,
   ) {}

   async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
   ): Promise<Observable<any>> {
      /*Get required data:*/
      const timeout = this.reflector.get<number>(
         'customTimeout',
         context.getHandler(),
      );
      const controller = context.getClass().name;
      const method = context.getHandler().name;
      const cacheData = await this.cacheService.findCacheData(
         controller,
         method,
      );
      /*Check if data already exist in cache-db, and it's fresh:*/
      if (
         cacheData &&
         Number(cacheData.createdAt) + timeout > Number(new Date())
      ) {
         console.log('Sending a cached data:');
         return of(JSON.parse(cacheData.value));
      } else {
         return next.handle().pipe(
            tap(async (data) => {
               console.log("Sending data from controller's method:");
               /*If cache-data exist in db but timeout is gone, delete the old row:*/
               if (cacheData) {
                  await this.cacheService.removeCacheDataById(cacheData.id);
               }
               /*And create a new one:*/
               await this.cacheService.insertCacheData({
                  controller,
                  method,
                  data,
               });
               /*Then go to controller's method.*/
            }),
         );
      }
   }
}
