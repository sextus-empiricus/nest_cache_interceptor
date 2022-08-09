import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CustomCacheModule } from '../custom-cache/custom-cache.module';

@Module({
   imports: [CustomCacheModule],
   controllers: [CatController],
   providers: [CatService],
})
export class CatModule {}
