import { SetMetadata } from '@nestjs/common';

export const SetCustomTimeout = (milliseconds: number) =>
   SetMetadata('customTimeout', milliseconds);
