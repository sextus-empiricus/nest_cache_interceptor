import { FailedResponse, SuccessResponse } from '../general/response';

interface setDummyCatsSuccess extends SuccessResponse {
   recordsAmount: number;
}

export type SetDummyCatsResponse = setDummyCatsSuccess | FailedResponse;
