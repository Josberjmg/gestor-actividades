import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateActivityDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsOptional()
    description?: string;
    
    @IsDate()
    @Type(() => Date)
    @IsOptional()
    date?: Date;

    @IsNumber()
    @IsNotEmpty()
    duration!: number;

    @IsBoolean()
    @IsOptional()
    completed?: boolean;
}