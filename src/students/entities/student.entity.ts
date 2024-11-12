import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
}