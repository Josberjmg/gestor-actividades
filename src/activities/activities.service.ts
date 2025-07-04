import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from './entities/activities.entity';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { User } from 'src/users/entities/user.entity';
import { console } from 'inspector';

@Injectable()
export class ActivitiesService {
    constructor(@InjectModel(Activity.name) private readonly activityModel: Model<Activity>) { }

    async create(createActivityDto: CreateActivityDto, id: string): Promise<Activity> {
        try {
            console.log({ createActivityDto, id });
            console.log('DTO recibido:', createActivityDto);
            const newActivity = await this.activityModel.create({ ...createActivityDto, user: new Types.ObjectId(id) });
            await newActivity.save()
            return newActivity;
        } catch (error) {
            throw new ConflictException('Error al crear la actividad');
        }
    }

    async findAll(userId: string): Promise<any> {
        try {
            const activities = await this.activityModel.find({ user: new Types.ObjectId(userId) }).populate<{ user: User }>("user");
            return activities;
        } catch (error) {
            throw new NotFoundException('No se encontraron actividades');
        }
    }

    async findOne(id: string, userId: string): Promise<Activity> {
    try {
        const activity = await this.activityModel.findOne({ _id: id, user: new Types.ObjectId(userId) });
        if (!activity) {
            throw new NotFoundException('Actividad no encontrada');
        }
        return activity;
    } catch (error) {
        throw new NotFoundException('Actividad no encontrada');
    }
}

    async update(id: string, updateActivityDto: UpdateActivityDto, userId: string): Promise<Activity> {
    const updatedActivity = await this.activityModel.findOneAndUpdate(
        { _id: id, user: new Types.ObjectId(userId) },
        updateActivityDto,
        { new: true }
    );

    if (!updatedActivity) {
        throw new NotFoundException('Actividad no encontrada para actualizar');
    }

    return updatedActivity;
}
    async delete(id: string, userId: string): Promise<Activity> {
        const exist = await this.findOne(id, userId);
        const deleted = await this.activityModel.findOneAndDelete({ _id: id, user: new Types.ObjectId(userId) });
        if (!deleted) {
            throw new ConflictException("Activity not deleted!");
        }
        return exist;
    }
}