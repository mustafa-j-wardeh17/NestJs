import { Controller, Get } from '@nestjs/common';


//@Controller to show that below class is type of Controller
@Controller('students')
export class StudentsController {

    // @Get to allow get request for this controller
    @Get()
    findAllStudents() {
        return 'All Students';
    }
}
