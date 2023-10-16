import { PrismaService } from "@app/shared/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { DoctorDto } from "./dto/create-doctor.dto";



@Injectable()
export class DoctorService {
  constructor(private prismaService:PrismaService) {}


  async createDoctor(data: DoctorDto) {
    return this.prismaService.doctor.create({
      data: {
        ...data
      }
    });
  }

  async getDoctors() {
    return this.prismaService.doctor.findMany();
  }

  async getDoctorById(id: number) {
    return this.prismaService.doctor.findUnique({
      where: {
        id: id
      }
    });
  }

  async updateDoctor(id: number, data: DoctorDto) {
    return this.prismaService.doctor.update({
      where: {
        id: id
      },
      data: {
        ...data
      }
    });
  }

  async deleteDoctor(id: number) {
    return this.prismaService.doctor.delete({
      where: {
        id: id
      }
    });
  }


}
