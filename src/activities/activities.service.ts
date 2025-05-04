import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from './entities/activities.entity';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ActivitiesService {
    constructor(@InjectModel(Activity.name) private readonly activityModel: Model<Activity>) {}

    async create(createActivityDto: CreateActivityDto, id: string): Promise<Activity> {
        const newActivity = await this.activityModel.create({...createActivityDto, user: id});
        return newActivity.save();
    }

    async findAll(userId: string): Promise<any> {
        return await this.activityModel.find({ user: userId }).populate<{user: User}>("user");
    }

    async findOne(id: string, userId: string): Promise<Activity | null> {
        return this.activityModel.findOne({id, user: userId});
    }

    async update(id: string, updateActivityDto: UpdateActivityDto, userId: string): Promise<Activity> {
        const updatedActivity = await this.activityModel.findOneAndUpdate({id, user: userId}, updateActivityDto, { new: true });
    
        if (!updatedActivity) {
            throw new Error('Actividad no encontrada para actualizar');
        }
    
        return updatedActivity; 
    }
    async delete(id: string, userId: string): Promise<Activity>{
        const exist = await this.findOne(id, userId);
        if( !exist ){
            throw new NotFoundException("Activity not found!");
        }
    
        const deleted = await this.activityModel.findOneAndDelete({id});
        if( !deleted ){
            throw new ConflictException("Activity not deleted!");
        }
        return exist
    }
}