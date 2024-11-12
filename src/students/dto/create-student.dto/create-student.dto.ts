import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateStudentDto {
    @IsString()
    readonly firstName: string;
    @IsString()
    readonly lastName: string;
    @IsNumber()
    readonly age: number;
    @IsArray({ each: true })
    readonly address: string[];
}
