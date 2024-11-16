import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
  imports: [
    StudentsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    AuthModule,
    PassportModule,
    JwtModule.register({ secret: 'secret_pass', signOptions: { expiresIn: '3d' } }),
    UsersModule,
  ],
})
export class AppModule { }
