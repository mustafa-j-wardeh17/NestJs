import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './students/students.controller';
import { StudentsService } from './students/students.service';
import { StudentsModule } from './students/students.module';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [StudentsModule],
})
export class AppModule {}
