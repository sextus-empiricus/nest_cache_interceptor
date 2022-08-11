import { Command, Console } from 'nestjs-console';
import { Inject, Injectable } from '@nestjs/common';
import { Cat } from './cat.entity';
import { DataSource } from 'typeorm';
import { GetAllCatsResponse } from '../../types/cat/cat.responses';
import { ResponseStatus } from '../../types/general/response';

@Injectable()
@Console({
   command: 'cats',
})
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

   @Command({ command: 'list', description: 'Get all list.' })
   async listUsersCmd() {
      console.log(await this.getAllCats());
   }
}
