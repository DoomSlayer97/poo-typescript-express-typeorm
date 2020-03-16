import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne} from "typeorm";
import { Task } from "./Task";
import { Country } from "./Country";
import { State } from "./State";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    email: string;
    
    @Column({ default: 1 })
    regStatus: number;
    
    @OneToMany(type => Task, task => task.user)
    tasks: Task[];

    @ManyToOne(type => State, state => state.users)
    state: State;

    // foreign key attributes

    @Column({type: 'int', nullable: true})
    stateId: number;

}