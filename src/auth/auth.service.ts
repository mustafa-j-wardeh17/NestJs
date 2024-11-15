import { Injectable, NotFoundException } from '@nestjs/common';

import { faker } from '@faker-js/faker'
import { IAuthenticate, Role } from './interface/Role';
import { AuthenticateDto } from './dto/authenticate.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {

    private users = [
        {
            id: faker.string.uuid(),
            userName: 'MustafaWardeh',
            password: 'mustafa',
            email: "mustafa@i.sass",
            role: Role.Admin,
        },
        {
            id: faker.string.uuid(),
            userName: 'salam',
            password: 'salam',
            email: "slam@i.sass",
            role: Role.User,
        }
    ]



    authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
        const user = this.users.find(user =>
            user.userName === authenticateDto.userName &&
            user.password === authenticateDto.password &&
            user.email === authenticateDto.email
        )

        if (!user) throw new NotFoundException('Invalid credentials')

        const token = sign({ ...user }, 'secret_pass', { expiresIn: '3d' })

        return {
            token,
            user
        }
    }
}
