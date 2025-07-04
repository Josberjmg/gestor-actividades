import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { Activity, activitySchema } from './entities/activities.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Activity.name, schema: activitySchema }]),
        AuthModule,
    ],
    providers: [ActivitiesService],
    controllers: [ActivitiesController],
})
export class ActivitiesModule {}
