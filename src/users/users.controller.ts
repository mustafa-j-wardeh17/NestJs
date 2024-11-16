import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // login
    @Post('login')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() signInDto: Record<string, any>) {
        return this.usersService.signIn(signInDto.userName, signInDto.password)
    }

    //create user
    @Post('signup')
    async create(@Body() user): Promise<UserEntity> {
        return this.usersService.create(user)
    }

    // get user profile
    @Roles('user')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('profile')
    profile(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(req.user)
    }

    // get all user for admin
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAllUsers(): Promise<UserEntity[]> {
        return this.usersService.findAll()
    }
}


