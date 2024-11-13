import { IsNumber, IsString } from "class-validator";

export class CreateStudentDto {
    @IsString()
    readonly firstName: string;
    @IsString()
    readonly lastName: string;
    @IsNumber()
    readonly age: number;
    @IsString({ each: true })
    readonly address: string[];
    @IsString({ each: true })
    readonly courses: string[];
}
