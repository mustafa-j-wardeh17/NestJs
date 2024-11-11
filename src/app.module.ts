import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './students/students.controller';
import { ParentsController } from './parents/parents.controller';

@Module({
  imports: [],
  controllers: [AppController, StudentsController, ParentsController],
  providers: [AppService],
})
export class AppModule {}
