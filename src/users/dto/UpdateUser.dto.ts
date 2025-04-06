import { IsNotEmpty, IsEmail, MinLength, IsOptional } from 'class-validator';
import { EmailUnique } from '../validations/email.unique.validator';

export class UpdateUserDTO {
    
    @IsOptional()
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    name: string;

    @IsOptional()
    @IsEmail(undefined, { message: 'O email informado é invalido' })
    @EmailUnique({ message: 'Esse email já possui cadastro' })
    email: string;

    @IsOptional()
    @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
    password: string;
}