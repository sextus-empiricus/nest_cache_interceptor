import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatModule } from './cat/cat.module';
import { SetDummyModule } from './set-dummy/set-dummy.module';
import { CustomCacheModule } from './custom-cache/custom-cache.module';
import { ConsoleModule } from 'nestjs-console';

import { config } from '../config/config';

const { host, port, database, password, username } = config.db;

@Module({
   imports: [
      ConsoleModule,
      TypeOrmModule.forRoot({
         type: 'mysql',
         host,
         port,
         username,
         password,
         database,
         entities: ['./dist/**/*.entity{.js,.ts}'],
         // logging: true,
         bigNumberStrings: false,
         synchronize: true,
      }),
      CatModule,
      SetDummyModule,
      CustomCacheModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}