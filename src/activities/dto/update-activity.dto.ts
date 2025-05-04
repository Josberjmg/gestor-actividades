import { CreateActivityDto } from "./create-activity.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateActivityDto extends PartialType(CreateActivityDto) {}