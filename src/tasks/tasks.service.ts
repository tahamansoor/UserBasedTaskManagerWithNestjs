import { Injectable, NotFoundException } from '@nestjs/common';
import { GetTaskFilterDto } from './dto/get-tasks-filter';
import { CreateTaskDto } from './dto/create-task-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';


@Injectable()
export class TasksService {
   constructor(
       @InjectRepository(TaskRepository)
       private taskrepository: TaskRepository,
   ){}

   async getTasks(
       filterDto:GetTaskFilterDto,
       user:User,
       ): Promise<task[]>{
       return this.taskrepository.getTasks(filterDto,user)

   }
async getTaskById(id:number,user:User):Promise<task>{
    const found = await this.taskrepository.findOne({where: {id, user: user.id }})
    if(!found){
    throw new NotFoundException(`task with id: "${id}" not found`);
    } 
    return found;
}


async updateTaskStatus(id:number, status: TaskStatus,user:User):Promise<task>{

    const task = await this.getTaskById(id,user)
    task.status = status
    await task.save();
    return task;


}
async deleteTask(id:number,user:User):Promise<void>{
    const result = await this.taskrepository.delete({id,user});
    console.log(result);

    if (result.affected === 0){
        throw new NotFoundException(`Task with id:${id} not found!`);
    }

}

    async createTask(
        createTaskDto:CreateTaskDto,
        user:User
        
        ):Promise<task>{
      return this.taskrepository.creatTask(createTaskDto,user);
    }
  
}
