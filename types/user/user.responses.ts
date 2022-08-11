import { FailedResponse, SuccessResponse } from '../general/response';

export interface CreateUserSuccess extends SuccessResponse {
   user: {
      id: string;
      email: string;
   };
}

export type CreateUserResponse = CreateUserSuccess | FailedResponse;
