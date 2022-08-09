import { InsertCacheDataInterface } from '../../../types/custom-cache/custom-cache';

export class InsertCacheDataDto implements InsertCacheDataInterface {
   controller: string;
   method: string;
   data: any;
}
