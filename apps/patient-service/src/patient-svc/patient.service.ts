import { Injectable } from '@nestjs/common';
import {PrismaService} from "@app/shared/prisma/prisma.service";
import {PatientDto} from "./dto/patient.dto";
import {Patient} from "./interfaces/patient.interface";

@Injectable()
export class PatientService {
  constructor(private prisma:PrismaService) {}


  async createPatient(data: PatientDto) : Promise<Patient> {
    return await this.prisma.patient.create({data});
  }

  async getPatients() : Promise<Patient[]> {
    return await this.prisma.patient.findMany();
  }


  async getPatientById(id: number) : Promise<Patient> {
    return await this.prisma.patient.findUnique({
      where: {
        id:Number(id),
      }});
  }

  async updatePatient(id: number, data: PatientDto) : Promise<Patient> {
    return await this.prisma.patient.update({where: {id: id}, data});
  }

  async deletePatient(id:number) {
    return await this.prisma.patient.delete({
      where: {
        id: id,
      }
    });
  }
}
