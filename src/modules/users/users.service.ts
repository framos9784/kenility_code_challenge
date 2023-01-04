import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async findOne(query: object): Promise<User> {
    return this.userModel.findOne(query);
  } 

  async findAll(): Promise<any> {
    return null;
  } 

  async create(createUserDto: CreateUserDto): Promise<any> {
    return this.userModel.create(createUserDto);
  }

  async update(updateUserDto: UpdateUserDto): Promise<any> {
    console.log(updateUserDto);
    return  null;
  }

}