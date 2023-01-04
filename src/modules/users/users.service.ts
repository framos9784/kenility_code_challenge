import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { User, UserDocument } from './user.schema';
import { AwsS3Service } from 'src/modules/shared/services/aws-s3.service';
import * as bcrypt from 'bcrypt';
import { ValidatorService } from '../shared/services/validator.service';
import { FileNotImageException } from 'src/exceptions/file-not-image.exception';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  private readonly validatorService: ValidatorService,
  private readonly awsS3Service: AwsS3Service,) { }

  async findOne(query: object): Promise<User> {
    return this.userModel.findOne(query);
  } 

  async findAll(): Promise<any> {
    return null;
  } 

  async create(createUserDto: CreateUserDto,
    profile_picture: {
      img?: Express.Multer.File[];
    }): Promise<User> {
    const saltOrRounds = 10;
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const user = new this.userModel({...createUserDto, password: hashedPassword});

    if (
      profile_picture?.img[0] &&
      !this.validatorService.isImage(profile_picture.img[0].mimetype)
    ) {
      throw new FileNotImageException();
    }

    if(profile_picture.img) {
      user.profile_picture = await this.awsS3Service.uploadImageToNewsBucket(
        profile_picture?.img[0],
        profile_picture?.img[0].originalname,
      ); 
    }

    if(!user.profile_picture) {
      throw new HttpException('Upload error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    user._created_at = new Date();

    delete user.password;
    const createdUser = await (await user.save()).toObject();
    delete createdUser.password;
    return createdUser;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    profile_picture: {
      img?: Express.Multer.File[];
    }): Promise<User> {

    if (
      profile_picture?.img &&
      profile_picture?.img[0] &&
      !this.validatorService.isImage(profile_picture.img[0].mimetype)
    ) {
      throw new FileNotImageException();
    }
  
    if (profile_picture?.img) {
      updateUserDto.profile_picture = await this.awsS3Service.uploadImageToNewsBucket(
        profile_picture?.img[0],
        profile_picture?.img[0].originalname,
      );
    }    

    return this.userModel.findByIdAndUpdate(
      {
       _id: id 
      },
      {
        updateUserDto
      },
      { new: true }
    )
  }

}