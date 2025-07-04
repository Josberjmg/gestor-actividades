import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ){}

  async signIn(signIn: SignInDto) {
    const { email, password } = signIn;
    const user = await this.usersService.findOneByEmail( email );

    if(!user){
      throw new BadRequestException("Credentials not valid");
    }

    if( user.password !== password ){
      throw new UnauthorizedException("Credentials not valid");
    }

    const token = await this.jwtService.signAsync(
      { email, id: user["_id"] }, 
      {secret: process.env.JWT_SECRET}
    );
    return {
      name:user.name,
      email:user.email,
      token,
    }
  }

  async signUp(createUserDto: CreateUserDto) {
     const user = await this.usersService.create(createUserDto);

     return user;
  }
}
