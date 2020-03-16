import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany} from "typeorm";
import { Country } from "./Country";
import { User } from "./User";

@Entity()
export class State {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default : 1} )
    regStatus: number;

    @ManyToOne(type => Country, country => country.states)
    country: Country;

    @OneToMany(type => User, user => user.state)
    users: User[];

    // foreign key attributes

    @Column({ type: 'int', nullable: true })
    countryId: number;

}