import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class GetTaskFilterDto{
    @ApiPropertyOptional( {enum:[TaskStatus.DONE,TaskStatus.IN_PROGRESS,TaskStatus.OPEN]})
    @IsOptional()
    @IsIn([TaskStatus.DONE,TaskStatus.IN_PROGRESS,TaskStatus.OPEN])
    
    status? : TaskStatus;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    search? : string;
} 