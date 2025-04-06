import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { EmailUnique } from '../validations/email.unique.validator';

export class CreateUserDTO {
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    name: string;

    @IsEmail(undefined, { message: 'O email informado é invalido' })
    @EmailUnique({ message: 'Esse email já possui cadastro' })
    email: string;

    @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
    password: string;
}