import { Controller, Inject, Param, Post } from '@nestjs/common';
import { SetDummyService } from './set-dummy.service';
import { SetDummyCatsResponse } from '../../types/set-dummy/set-dummy.responses';

@Controller('set-dummy')
export class SetDummyController {
   constructor(
      @Inject(SetDummyService) private setDummyService: SetDummyService,
   ) {}

   @Post('/cats/:amount')
   async setDummyCats(
      @Param('amount') amount: string,
   ): Promise<SetDummyCatsResponse> {
      return await this.setDummyService.setDummyCats(Number(amount));
   }
}
