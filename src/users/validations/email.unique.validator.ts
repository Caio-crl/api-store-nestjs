import { Injectable } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    ValidationOptions,
    registerDecorator,
} from 'class-validator';
import { UserRepository } from '../user.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUniqueValidator implements ValidatorConstraintInterface {

    constructor(private userRepository: UserRepository) { }

    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
        const userEmailExist = await this.userRepository.emailExist(value);
        return !userEmailExist;
    }
}

export const EmailUnique = (options: ValidationOptions) => {
    return (object: Object, props: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: props,
            options: options,
            constraints: [],
            validator: EmailUniqueValidator,
        });
    };
};