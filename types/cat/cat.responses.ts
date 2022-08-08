import { FailedResponse, SuccessResponse } from '../general/response';
import { Cat } from '../../src/cat/cat.entity';

interface GetAllCatsSuccess extends SuccessResponse {
   cats: Cat[];
}

export type GetAllCatsResponse = GetAllCatsSuccess | FailedResponse;
