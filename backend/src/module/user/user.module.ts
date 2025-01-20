import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PetModule } from '../pet/pet.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PetModule], //import the User entity for TypeORM use in the UserModule
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService] // must export the UserService to be used in other modules
})
export class UserModule { }
