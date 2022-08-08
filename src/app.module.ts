import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config/config';
import { CatModule } from './cat/cat.module';
import { SetDummyModule } from './set-dummy/set-dummy.module';

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
         logging: true,
         bigNumberStrings: false,
         synchronize: true,
      }),
      CatModule,
      SetDummyModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {
}
