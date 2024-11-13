import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { Course } from './entities/course.entity';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private StudentRepository: Repository<Student>,
        @InjectRepository(Course)
        private CourseRepository: Repository<Course>,
    ) { }


    //--------------------------------
    //--------GET ALL STUDENTS--------
    //--------------------------------
    async getAllStudents(): Promise<Student[]> {
        return await this.StudentRepository.find({
            relations: ['courses'] // To show courses after make the relation between entities
        })
    }


    //--------------------------------
    //----------GET STUNDET-----------
    //--------------------------------
    async getStudent(id: string): Promise<Student> {
        const foundStudent = await this.StudentRepository.findOne({
            where: {
                id: +id
            },
            relations: ['courses']
        })
        if (foundStudent) {
            return foundStudent
        }
        //throw 'User No Found' 500 server error
        //throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        throw new NotFoundException('User Not Found')
    }


    //--------------------------------
    //--------DELETE STUNDET----------
    //--------------------------------
    async deleteStudent(id: string) {
        const deleteStudent = await this.StudentRepository.delete({
            id: +id
        })
        if (deleteStudent.affected === 0) {
            return `user with id = ${id} deleted successfully`
        }
        throw new HttpException(`User with id = ${id} Not Found`, HttpStatus.NOT_FOUND) // specific http error
    }



    //--------------------------------
    //--------CREATE STUNDET----------
    //--------------------------------
    async createStudent(createData: CreateStudentDto): Promise<Student> {
        const courses = createData.courses && (
            await Promise.all(
                createData.courses.map(course => this.preloadCourse(course))
            )
        )
        const createStudent = await this.StudentRepository.create({
            ...createData,
            courses
        })

        return this.StudentRepository.save(createStudent)
    }


    //--------------------------------
    //--------UPDATE STUNDET----------
    //--------------------------------
    async updateStudent(id: string, updateData: UpdateStudentDto) {
        const courses = updateData.courses && (
            await Promise.all(
                updateData.courses.map(course => this.preloadCourse(course))
            )
        )
        const updateStudent = await this.StudentRepository.preload(
            {
                id: +id,
                ...updateData,
                courses
            }
        )

        this.StudentRepository.save(updateStudent)  // like create must save after preload


        if (updateStudent) {
            return `Student Updated Successfully`;
        }

        throw new HttpException(`User with id = ${id} Not Found`, HttpStatus.NOT_FOUND)
    }

    //--------------------------------
    //--------PRELOAD COURSE----------
    //--------------------------------

    private async preloadCourse(name: string): Promise<Course> {
        const findCourse = await this.CourseRepository.findOne({
            where: {
                name
            }
        })

        if (findCourse) {
            return findCourse
        }

        const createCourse = await this.CourseRepository.create({
            name
        })


        return this.CourseRepository.save(createCourse)
    }
}
