import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAllUsers(): Promise<UserEntity[]> {
        return this.usersService.findAll()
    }


    @Post('login')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() signInDto: Record<string, any>) {
        return this.usersService.signIn(signInDto.userName, signInDto.password)
    }
}
