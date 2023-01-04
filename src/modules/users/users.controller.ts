import { Body, Controller, Get, Request, Post, Put, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('find-all')
  findAll(): Promise<any> {
    return this.usersService.findAll();
  } 

  @Post('sign-up')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'img', maxCount: 1 }
    ])
  )
  create(@Body() createUserDto: CreateUserDto,
  @UploadedFiles()
  profile_picture: { img?: Express.Multer.File[] },
  ): Promise<User> {
    return this.usersService.create(createUserDto, profile_picture);
  }

  @Put('update')
  updateUser( 
    @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(updateUserDto);
  }


}
