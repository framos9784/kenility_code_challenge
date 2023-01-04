import { Body, Controller, Get, Request, Post, Put, UseGuards, UseInterceptors, UploadedFiles, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User } from './user.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
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

  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'img', maxCount: 1 }
    ])
  )
  updateUser(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles()
    profile_picture: {
      img?: Express.Multer.File[]; file?: Express.Multer.File[]
    }): Promise<User> {
    return this.usersService.update(id, updateUserDto, profile_picture );
  }


}
