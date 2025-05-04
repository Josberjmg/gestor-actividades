import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateActivityDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsOptional()
    description?: string;
    
    @IsDate()
    @IsNotEmpty()
    date!: Date;

    @IsNumber()
    @IsNotEmpty()
    duration!: number;
}