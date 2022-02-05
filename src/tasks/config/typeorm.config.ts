import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { task } from "../task.entity";
export const typeOrmConfig: TypeOrmModuleOptions = {
    // 
        type: 'postgres',
        host:process.env.HOST,
        port: parseInt(process.env.DB_PORT),
        database: process.env.DB_NAME,
        username: process.env.DB_USER ,
        password: process.env.DB_PASS ,    
        entities: [User,task],
        synchronize: true
    }
    console.log(typeOrmConfig)