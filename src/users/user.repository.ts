import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];

    async emailExist(email: string): Promise<boolean> {
        const possibleUser = this.users.find(user => {
            if (user && user.email) {
                return user.email === email;
            } else {
                console.warn('UserRepository - Usuário sem email:', user);
                return false; 
            }
        });
        return possibleUser !== undefined;
    }

    async listUsers () {
        return this.users
    }

    async save(user: UserEntity) {
        if (user && user.email) {
            this.users.push(user);
        } else {
            console.warn('UserRepository - Tentativa de salvar usuário sem email:', user);
        }  
    }

 async update(id: string, dataUpdated: Partial<UserEntity>) {
    const possibleUser = this.users.find(
      usersSave => usersSave.id === id
    );

    if (!possibleUser) {
      throw new Error('Usuário não encontrado');
    }

    Object.entries(dataUpdated).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      possibleUser[chave] = valor;
    });

    return possibleUser;
  }
  
  async delete(id: string): Promise<UserEntity | undefined> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined; 
    }

    const deletedUser = this.users.splice(userIndex, 1)[0];
    return deletedUser;
  }
}