import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    userUUID: string;

    @Column()
    email: String;

    @Column()
    password: string;

    @Column({ nullable: true })
    role: string
}
