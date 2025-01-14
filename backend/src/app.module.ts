import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestConnectionService } from './config/testConnection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user/user.entity';
import { UserModule } from './entities/user/user.module';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { JwtMiddleware } from './middleware/jwtMiddleware';
import { LimitLoginAttemptsMiddleware } from './middleware/limitLoginAttemptMiddleware';
import { Pet } from './entities/pet/pet.entity';
import { PetModule } from './entities/pet/pet.module';
import { Adoption } from './entities/adoption/adoption.entity';
import { AdoptionModule } from './entities/adoption/adoption.module';
import { DonationModule } from './entities/donation/donation.module';
import { Donation } from './entities/donation/donation.entity';
import { PaypalModule } from './entities/paypal/paypal.module';
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
        entities: [User, Pet, Adoption, Donation],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule, //import the UserModule for use globally in the AppModule
    AuthenticateModule,
    PetModule,
    AdoptionModule,
    DonationModule,
    PaypalModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestConnectionService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('*')
      .apply(LimitLoginAttemptsMiddleware)
      .forRoutes('/authenticate/login');
  }
}
