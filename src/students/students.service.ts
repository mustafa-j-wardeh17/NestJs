import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';

@Injectable()
export class StudentsService {

    private readonly Students: {
        readonly id: number,
        readonly firstName: string,
        readonly lastName: string,
        readonly age: number,
        readonly address: string[]
    }[] = [
            {
                id: 1,
                firstName: "Mustafa",
                lastName: "Wardeh",
                age: 24,
                address: ['palestine', 'hebron', 'alaroub']
            },
            {
                id: 2,
                firstName: "Fares",
                lastName: "Joma",
                age: 29,
                address: ['palestine', 'hebron']
            },
            {
                id: 3,
                firstName: "Qais",
                lastName: "Faleh",
                age: 16,
                address: ['palestine', 'jerusalem']
            }
        ]

    getAllStudents() {
        return this.Students
    }

    getStudent(id: string) {
        const foundStudent = this.Students.find(student => student.id === +id)
        if (foundStudent) {
            return foundStudent
        }
        //throw 'User No Found'
        //throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
        throw new NotFoundException('User Not Found')
    }

    deleteStudent(id: string) {
        const userIndex = this.Students.findIndex(student => student.id === +id)
        if (userIndex) {
            return this.Students.splice(userIndex, 1)
        }

        throw new HttpException(`User with id = ${id} Not Found`, HttpStatus.NOT_FOUND)

    }

    createStudent(createData: CreateStudentDto) {
        this.Students.push({ ...createData, id: this.Students.length + 1 })
        return `Student Created Successfully`
    }
    updateStudent(id: string, updateData: UpdateStudentDto) {
        const studentIndex = this.Students.findIndex(student => student.id === +id);

        if (studentIndex !== -1) {
            this.Students[studentIndex] = {
                ...this.Students[studentIndex],  // To keep existing values
                ...updateData  // to update the changing fields
            };
            return `Student Updated Successfully`;
        }

        throw new HttpException(`User with id = ${id} Not Found`, HttpStatus.NOT_FOUND)
    }
}
