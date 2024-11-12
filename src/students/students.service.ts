import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentsService {

    private readonly Students = [
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
        return this.Students.find(student => student.id === +id)
    }

    deleteStudent(id: string) {
        return this.Students.splice(this.Students.findIndex(student => student.id === +id), 1)
    }

    createStudent(){
        
    }
}
