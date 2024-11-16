import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }

    async signIn(userName: string, password: string) {
        const user = await this.userRepository.findOne({
            where: {
                userName: userName
            }
        })

        if (!user || user.password !== password) {
            throw new NotFoundException('Invalid credintials')
        }

        const token = sign({ ...user }, 'secret_pass')

        return {
            token,
            user
        }
    }

    async create(user: Partial<UserEntity>): Promise<UserEntity> {
        const findUser = await this.userRepository.findOne({
            where: {
                userName: user.userName
            }
        })

        if (findUser) {
            throw 'User is allready found'
        }

        const createUser = await this.userRepository.create({
            userUUID: faker.string.uuid(),
            ...user
        })

        return await this.userRepository.save(createUser)
    }
}
