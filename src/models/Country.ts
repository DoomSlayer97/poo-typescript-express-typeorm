import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { User } from "./User";
import { State } from "./State";

@Entity()
export class Country {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: 1 })
    regStatus: number;

    @OneToMany(type => State, state => state.country)
    states: State[];

}