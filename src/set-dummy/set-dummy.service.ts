import { Inject, Injectable } from '@nestjs/common';
import { generateCatsArr } from './utils/generateCatsArr';
import { DataSource } from 'typeorm';
import { Cat } from '../cat/cat.entity';
import { ResponseStatus } from '../../types/general/response';
import { SetDummyCatsResponse } from '../../types/set-dummy/set-dummy.responses';

@Injectable()
export class SetDummyService {
   constructor(@Inject(DataSource) private dataSource: DataSource) {}

   async setDummyCats(amount: number): Promise<SetDummyCatsResponse> {
      try {
         const dummyCats = generateCatsArr(amount);
         await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(Cat)
            .values(dummyCats)
            .execute();

         return {
            status: ResponseStatus.success,
            recordsAmount: dummyCats.length,
         };
      } catch (e) {
         return {
            status: ResponseStatus.failed,
            message: e.message,
         };
      }
   }
}
