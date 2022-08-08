import { Module } from '@nestjs/common';
import { SetDummyController } from './set-dummy.controller';
import { SetDummyService } from './set-dummy.service';

@Module({
  controllers: [SetDummyController],
  providers: [SetDummyService]
})
export class SetDummyModule {}
