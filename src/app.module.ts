import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatModule } from './cat/cat.module';
import { SetDummyModule } from './set-dummy/set-dummy.module';
import { config } from '../config/config';
import { CustomCacheModule } from './custom-cache/custom-cache.module';
import { DogModule } from './dog/dog.module';

const { host, port, database, password, username } = config.db;

@Module({
   imports: [
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
      DogModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
