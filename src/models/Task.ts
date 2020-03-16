import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;
    
    @Column({ default: 1 })
    regStatus: number;
    
    @ManyToOne(type => User, user => user.tasks)
    user: User;

    // foreign key attributes
    @Column({ type: 'int', nullable: true })
    userId: number;

}