import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestConnectionService } from './config/testConnection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
require('dotenv').config();


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule, //import the UserModule for use globally in the AppModule
  ],
  controllers: [AppController],
  providers: [AppService, TestConnectionService],
})
export class AppModule { }
