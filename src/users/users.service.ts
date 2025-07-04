import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
      const createdUser = await this.userModel.create(createUserDto);
      return createdUser.save();
  }

  async findAll(): Promise<User[]> {
      return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findOne({_id: id});
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({email});
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    
      if (!updatedUser) {
          throw new NotFoundException('User not update');
      }
  
      return updatedUser; 
  }
  async delete(id: string): Promise<User>{
          const user = await this.findOne(id);
          if( !user ){
              throw new NotFoundException("User not found!");
          }
      
          const deleted = await this.userModel.findOneAndDelete({_id: id});
          if( !deleted ){
              throw new ConflictException("User not deleted!");
          }
          return user
        }
}
