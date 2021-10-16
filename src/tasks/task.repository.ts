import { Delete } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task-dto";
import { GetTaskFilterDto } from "./dto/get-tasks-filter";
import { TaskStatus } from "./task-status.enum";
import { task } from "./task.entity";
@EntityRepository(task)
export class TaskRepository extends Repository<task>{

    async getTasks(
        filterDto:GetTaskFilterDto,
        user:User
        ): Promise<task[]>{
        const {search,status} = filterDto;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId',{userId: user.id})

        if(status){
            query.andWhere('task.status = :status', {status})
        }
        if(search){
            query.andWhere('task.title LIKE :search OR task.decription LIKE :search',{search:`%${search}%` })
        }

        
        const tasks = await query.getMany()

        return tasks;

    }



    async creatTask(
        createTaskDto: CreateTaskDto,
        user:User
        
        ): Promise<task> {
        const {title, description} = createTaskDto;

        const Task = new task();

        Task.title = title;
        Task.decription = description;
        Task.status = TaskStatus.OPEN;
        task.user = user;
        await Task.save()

        
        return Task;

    }

}