import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { CustomCacheModule } from './custom-cache/custom-cache.module';
import { SetDummyModule } from './set-dummy/set-dummy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { config } from '../config/config';
import { AuthModule } from './auth/auth.module';

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
      CustomCacheModule,
      SetDummyModule,
      UserModule,
      AuthModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
