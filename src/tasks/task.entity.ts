import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
@Entity()
export class task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;
    
    @Column()
    decription:string;

    @Column()
    status:TaskStatus;

    @ManyToOne(type => User, user => user.tasks, {eager:false})
    user:User
    static user: User;

}