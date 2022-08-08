export enum ResponseStatus {
   success = 'success',
   failed = 'failed',
}

export interface SuccessResponse {
   status: ResponseStatus.success;
}

export interface FailedResponse {
   status: ResponseStatus.failed;
   message: string;
}
