import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from './entities/activities.entity';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request } from 'express';

@Controller('activities')
@UseGuards(AuthGuard)
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @Post()
    create(@Body() createActivityDto: CreateActivityDto, @Req() request: Request): Promise<Activity> {
        const userId = request["user"].userId;
        return this.activitiesService.create(createActivityDto, userId);
    }

    @Get()
    findAll(@Req() request: Request): Promise<Activity[]> {
        const userId = request["user"].id
        return this.activitiesService.findAll(userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() request: Request): Promise<Activity | null> {
        const userId = request["user"].id;
        return this.activitiesService.findOne(id, userId);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto, @Req() request: Request): Promise<Activity> {
        const userId = request["user"].id;
        return this.activitiesService.update(id, updateActivityDto, userId);
    }

    @Delete(':id')
    delete(@Param('id') id: string, @Req() request: Request): Promise<Activity> {
        const userId = request["user"].id;
        return this.activitiesService.delete(id, userId);
    }
}