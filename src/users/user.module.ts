import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EmailUniqueValidator } from './validations/email.unique.validator';
import { UserRepository } from './user.repository';

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository, EmailUniqueValidator],
})
export class UserModule {}