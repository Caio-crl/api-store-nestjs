import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('/users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async listUsers() {
        return this.userService.listUsers();
    }

    @Post('/create')
    async createUser(@Body() userData: CreateUserDTO) {
      return this.userService.createUser(userData);
    } 
    
    @Put('/update/:id')
    async updateUser(@Param('id') id: string, @Body() newUserData: UpdateUserDTO) { // Adicione o @Body()
      const userUpdated = await this.userService.updateUser(id, newUserData)
      
      return {
        user: userUpdated,
        message: 'Usuário atualizado com sucesso',
      };
    }  
    
    @Delete('/delete/:id')
    async removeUser(@Param('id') id: string) {
      try {
        const deletedUser = await this.userService.deleteUser(id);
        return {
          user: deletedUser,
          message: 'Usuário deletado com sucesso',
        };
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
}