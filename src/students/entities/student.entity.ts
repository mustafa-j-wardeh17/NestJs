import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";


@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column('json', { nullable: true }) // nullable mean optional
    address: string[]

    @JoinTable()
    @ManyToMany(type=>Course,
        course=>course.students,{cascade:true} //to make deletiong if delete main col delete other cols
    )
    courses:Course[];
}