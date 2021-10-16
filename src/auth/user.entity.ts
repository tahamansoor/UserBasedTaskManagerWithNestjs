import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { task } from "src/tasks/task.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username:string;

    @Column()
    password:string;

    @Column({nullable: true})
    salt:string;

    @OneToMany(type => task,task => task.user, {eager:true})
    tasks:task[]

    async validatepassword(password:string):Promise<boolean>{
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password;

    }

    
}