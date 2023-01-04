export class CreateUserDto {
    name: string;
    lastname: string;
    username: string;
    password: string;
    address?:string;
    profile_picture?:string;
}