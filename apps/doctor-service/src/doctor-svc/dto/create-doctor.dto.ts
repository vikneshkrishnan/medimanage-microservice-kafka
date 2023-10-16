import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import { Patient } from "@prisma/client";


export class DoctorDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password:string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  patients: Patient[];

}
