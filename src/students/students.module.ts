import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Student])],
    controllers: [StudentsController],
    providers: [StudentsService],
})
export class StudentsModule { }
