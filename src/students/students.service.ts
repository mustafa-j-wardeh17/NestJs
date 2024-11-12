import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private StudentRepository: Repository<Student>
    ) { }

    async getAllStudents(): Promise<Student[]> {
        return await this.StudentRepository.find()
    }

    async getStudent(id: string): Promise<Student> {
        const foundStudent = await this.StudentRepository.findOne({
            where: {
                id: +id
            }
        })
        if (foundStudent) {
            return foundStudent
        }
        //throw 'User No Found'
        //throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        throw new NotFoundException('User Not Found')
    }

    async deleteStudent(id: string) {
        const deleteStudent = await this.StudentRepository.delete({
            id: +id
        })
        if (deleteStudent.affected === 0) {
            return `user with id = ${id} deleted successfully`
        }
        throw new HttpException(`User with id = ${id} Not Found`, HttpStatus.NOT_FOUND)
    }

    async createStudent(createData: CreateStudentDto): Promise<Student> {
        const createStudent = await this.StudentRepository.create({
            ...createData
        })

        return this.StudentRepository.save(createStudent)
    }

    async updateStudent(id: string, updateData: UpdateStudentDto) {
        const updateStudent = await this.StudentRepository.update(id, updateData);


        if (updateStudent.affected === 0) {
            return `Student Updated Successfully`;
        }

        throw new HttpException(`User with id = ${id} Not Found`, HttpStatus.NOT_FOUND)
    }
}
