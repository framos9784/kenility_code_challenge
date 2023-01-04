import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';


export type User = any;

@Injectable()
export class UsersService {

  async findOne(username: string): Promise<any> {
    return null;
  } 

  async findAll(): Promise<any> {
    return null;
  } 

  async create(createUserDto: CreateUserDto): Promise<any> {
    console.log(createUserDto);
    return null;
  }

  async update(updateUserDto: UpdateUserDto): Promise<any> {
    console.log(updateUserDto);
    return  null;
  }

}