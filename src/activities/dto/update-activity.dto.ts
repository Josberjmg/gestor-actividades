import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateActivityDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    date?: Date;

    @IsNumber()
    @IsOptional()
    duration?: number;

    @IsBoolean()
    @IsOptional()
    completed?: boolean;
}