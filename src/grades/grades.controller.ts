import { Controller, Get, Headers, Param, Response } from '@nestjs/common';

@Controller('grades')
export class GradesController {
    @Get()
    getGrades() {
        return `all grades`
    }
    @Get(':id')
    getStudentGrades(@Param('id') id, @Headers() { cookie }, @Response() res) {
        if (cookie) {
            const cookies = cookie.split(';').reduce((acc, cookieStr) => {
                const [key, value] = cookieStr.split('=').map(val => val.trim());
                acc[key] = value;
                return acc;
            }, {});

            const token = cookies['token']; 
            console.log("token is ==> ", token);

            return token
                ? res.status(200).json({
                    data: `All student with id=${id} grades`,
                    token
                })
                : res.status(500).send('Something went wrong');
        } else {
            return res.status(400).send('No cookies found');
        }
    }
}
