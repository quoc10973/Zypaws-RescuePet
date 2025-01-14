import { Module } from '@nestjs/common';
import { AuthenticateController } from './authenticate.controller';
import { AuthenticateService } from './authenticate.service';
import { UserModule } from 'src/module/user/user.module';
import { JwtModule } from '@nestjs/jwt';
require('dotenv').config();

@Module({
  imports: [
    UserModule, // import the UserModule for use globally in the AuthenticateModule
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: `${process.env.EXPIRES_IN}` },
    })
  ],
  controllers: [AuthenticateController],
  providers: [AuthenticateService]
})
export class AuthenticateModule { }
