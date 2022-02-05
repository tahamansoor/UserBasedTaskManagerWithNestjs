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
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('tasks')
@UseGuards(AuthGuard())
@ApiBearerAuth()

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
    getTaskById(@Param('id',ParseIntPipe) id:number,
    @GetUser()user:User
    ):Promise<task>{
       return this.tasksService.getTaskById(id,user);



    }

    @Delete('/:id')
    deleteTask(@Param('id',ParseIntPipe) id:number,
    @GetUser()user:User
    ):void{
      this.tasksService.deleteTask(id,user);
    }
 
    @Post()
    @UsePipes(ValidationPipe)
    creatTask(
       @Body()createTaskDto: CreateTaskDto,
       @GetUser() user:User
    
    ): Promise<task> {
    return this.tasksService.createTask(createTaskDto,user);
    }


    @Patch('/:id')
    updateTaskStatus(
       @Body('status', TaskStatusValidationPipe)status:TaskStatus,
       @Param('id', ParseIntPipe)id:number,
       @GetUser()user:User
      
       ):Promise<task>{
          return this.tasksService.updateTaskStatus(id,status,user);

     
          

    }
    

}


