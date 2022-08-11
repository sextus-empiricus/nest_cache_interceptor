import { Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserResponse } from '../../types/user/user.responses';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ResponseStatus } from '../../types/general/response';

@Injectable()
export class UserService {
   constructor(@Inject(DataSource) private dataSource: DataSource) {}

   async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
      try {
         const { email, password } = createUserDto;
         const newUser = await this.dataSource
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
               email,
               password: await hash(password, 12),
            })
            .execute();

         return {
            status: ResponseStatus.success,
            user: {
               id: newUser.identifiers[0].id,
               email,
            },
         };
      } catch (e) {
         return {
            status: ResponseStatus.failed,
            message: e.message,
         };
      }
   }

   findAll() {
      return `This action returns all user`;
   }

   findOne(id: number) {
      return `This action returns a #${id} user`;
   }

   update(id: number, updateUserDto: UpdateUserDto) {
      return `This action updates a #${id} user`;
   }

   remove(id: number) {
      return `This action removes a #${id} user`;
   }
}
