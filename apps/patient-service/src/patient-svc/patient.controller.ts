import {Controller, Inject, OnModuleInit} from '@nestjs/common';
import {PatientService} from "./patient.service";
import {ClientKafka, Ctx, KafkaContext, MessagePattern, Payload} from "@nestjs/microservices";
import {PatientDto} from "./dto/patient.dto";
import {Patient} from "./interfaces/patient.interface";

@Controller('patient')
export class PatientController {
  constructor(
    @Inject('PATIENT_SERVICE') private patientClient: ClientKafka,
    private patientService: PatientService) {
  }

  @MessagePattern('patient_created')
  async createPatient(@Payload() patientDto: PatientDto): Promise<Patient> {
    return this.patientService.createPatient(patientDto)
  }

  @MessagePattern('patient_lists')
  async getPatients() {
    const response = await this.patientService.getPatients();
    this.patientClient.emit('patient_lists.reply', { value: JSON.stringify(response) });
  }


  @MessagePattern('patient_lists_by_id')
  async getPatientById(@Payload() data:any) : Promise<Patient> {
    return this.patientService.getPatientById(Number(data.id));
  }

  @MessagePattern('patient_updated')
  async updatePatient(@Payload() data: any): Promise<Patient> {
    return this.patientService.updatePatient(Number(data.id), data.patient);
  }

  @MessagePattern('patient_deleted')
  async deletePatient(@Payload() data:any) : Promise<Patient> {
    console.log(data);
    return this.patientService.deletePatient(Number(data.id));
  }
}
