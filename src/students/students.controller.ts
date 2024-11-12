import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    constructor(private readonly Student: StudentsService) { }

    @Get()
    getAllStudents() {
        return this.Student.getAllStudents()
    }

    @Post()
    createStudent(@Body() createData: CreateStudentDto) {

    }

    @Patch(':id')
    updateStudent(@Param('id') id: number, @Body() updateData: UpdateStudentDto) {

    }

    @Delete(':id')
    deleteStudent(@Param('id') id: number) {

    }

    @Get(':id')
    getUserById(@Param('id') id: number) {

    }
}
