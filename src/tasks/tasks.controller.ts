import { Body, Controller,Delete,Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { task } from './task.entity';
import { TasksService } from './tasks.service';
import { AuthGuard} from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService:TasksService){}

    @Get()
    getTasks(
       @Query(ValidationPipe) filterDto:GetTaskFilterDto,
       @GetUser() user:User,
       
       ):Promise<task[]>{
       return this.tasksService.getTasks(filterDto,user)
       
    }
    
    @Get('/:id')
    getTaskById(@Param('id',ParseIntPipe) id:number,):Promise<task>{
       return this.tasksService.getTaskById(id);



    }

    @Delete('/:id')
    deleteTask(@Param('id',ParseIntPipe) id:number,):void{
      this.tasksService.deleteTask(id);
    }
 
    @Post()
    @UsePipes(ValidationPipe)
    creatTask(
       @Body()createTaskDto: CreateTaskDto,
       @GetUser() user:User
    
    ): Promise<task> {
    return this.tasksService.createTask(createTaskDto,user);
    }


    @Patch('/:id/status')
    updateTaskStatus(
       @Param('id', ParseIntPipe)id:number,
       @Body('status', TaskStatusValidationPipe)status:TaskStatus,
       ):Promise<task>{
          return this.tasksService.upadateTaskStatus(id,status);

     
          

    }
    

}