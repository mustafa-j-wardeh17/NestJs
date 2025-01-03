import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtAuthGuard } from './jwt.guard';
import { Roles } from './roles/roles.decorator';
import { RolesGuard } from './roles/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post()
    login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
        try {
            const response = this.authService.authenticate(authenticateDto)
            return res.status(HttpStatus.OK).json({ response })
        } catch (error) {
            return res.status(error.status).json(error.message)
        }
    }


    // Authorize Route For admin only
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    profile(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(req.user);
    }

}
