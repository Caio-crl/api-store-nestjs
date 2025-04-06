import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { ListUsersDTO } from './dto/ListUsers.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(userData: CreateUserDTO) {
        const userEntity: UserEntity = {
          id: uuid(),
          ...userData,
        };
      
        await this.userRepository.save(userEntity);
      
        return {
          id: userEntity.id,
          mensagem: 'Usuário criado com sucesso',
        };
    }

    async listUsers(): Promise<ListUsersDTO[]> {
        const usersSave = await this.userRepository.listUsers();
        const usersList = usersSave.map(
        user => new ListUsersDTO(
            user.id,
            user.name
        )
        );
        return usersList;
    }

    async updateUser(id: string, updateData: UpdateUserDTO) {
        try {
            const userUpdated = await this.userRepository.update(id, updateData);
            return userUpdated;
        } catch (error) {
            throw new NotFoundException(`Usuário com ID ${id} não encontrado`); // Ou outro tratamento de erro
        }
    }
    
    async deleteUser(id: string) {
        const deletedUser = await this.userRepository.delete(id);
        if (!deletedUser) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return deletedUser;
      }
}