import { Module } from '@nestjs/common';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';
import { UserModule } from 'src/module/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
require('dotenv').config();

@Module({
  imports: [
    UserModule, // import the UserModule for use globally in the AuthenticateModule
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: `${process.env.EXPIRES_IN}` },
    }),
    PassportModule.register({ defaultStrategy: 'google' }), // register the GoogleStrategy as the default strategy 
  ],
  controllers: [AuthenticateController],
  providers: [AuthenticateService, GoogleStrategy]
})
export class AuthenticateModule { }
