import { Body, Controller, Get, Request, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.schema';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('find-all')
  findAll(): Promise<any> {
    return this.usersService.findAll();
  } 

  @Post('sign-up')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Put('update')
  updateUser( 
    @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(updateUserDto);
  }


}
