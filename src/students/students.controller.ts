import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';


//@Controller to show that below class is type of Controller
@Controller('students')
export class StudentsController {

    // @Get to allow get request for this controller
    // http request for /students
    @Get()
    findAllStudents() {
        return 'All Students';
    }

    @Get('query')
    getStudentsByQuery(@Query() query) {
        const { page, limit, type } = query
        return `page :${page || 1} \nwith these # of data(${(page || 1) * limit}-${((page || 1) + 1) * limit}) \nin this type of data ${type}`
    }


    // http request for /students/[dynamic id]
    @Get(':id')
    findStudent(@Param('id') id: string) {
        return `Student with id = ${id}`
    }

    // http request for /students/mustafa/info
    @Get('mustafa/info')
    findMustafa() {
        return `Mustafa Information`
    }

    // @Post decorator
    @Post('create')
    createStudent(@Body("firstName") body) {
        return body
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto) {
        return `This action updates a #${id} with these data ${JSON.stringify(updateCatDto)}`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }

}
