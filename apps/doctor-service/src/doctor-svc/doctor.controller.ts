import {Controller, Inject} from "@nestjs/common";
import {ClientKafka, MessagePattern, Payload} from "@nestjs/microservices";
import { DoctorService } from "./doctor.service";
import { DoctorDto } from "./dto/create-doctor.dto";
import { Doctor } from "./interfaces/doctor.interface";

@Controller()
export class DoctorController {
  constructor(
    @Inject('DOCTOR_SERVICE') private doctorClient: ClientKafka,
    private doctorService: DoctorService
  ) {}

  @MessagePattern('doctor_created')
  async createDoctor(@Payload() doctorDto: DoctorDto): Promise<Doctor> {
    return this.doctorService.createDoctor(doctorDto)
  }

  @MessagePattern('doctor_lists')
  async getDoctors() {
    const response = await this.doctorService.getDoctors();
    this.doctorClient.emit('doctor_lists.reply', { value: JSON.stringify(response) });
  }

  @MessagePattern('doctor_lists_by_id')
  async getDoctorById(@Payload() data:any) : Promise<Doctor> {
    return this.doctorService.getDoctorById(Number(data.id));
  }

  @MessagePattern('doctor_updated')
  async updateDoctor(@Payload() data: any): Promise<Doctor> {
    return this.doctorService.updateDoctor(Number(data.id), data.doctor);
  }

  @MessagePattern('doctor_deleted')
  async deleteDoctor(@Payload() data:any) : Promise<Doctor> {
    return this.doctorService.deleteDoctor(Number(data.id));
  }
}
