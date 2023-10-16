import {Body, Controller, Delete, Get, Inject, OnModuleDestroy, OnModuleInit, Param, Post, Put} from '@nestjs/common';
import {ClientKafka, EventPattern, Payload} from "@nestjs/microservices";
import {PatientDto} from "./dto/patient.dto";
import {Observable} from "rxjs";
import {Patient} from "./interfaces/patient.interface";
import { ApiTags } from '@nestjs/swagger';

@Controller('patient')
@ApiTags('patient')
export class PatientController implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('PATIENT_SERVICE') private patientClient: ClientKafka,
  ) {
  }


  async onModuleInit() {
    // Subscribe to reply topic
    this.patientClient.subscribeToResponseOf('patient_lists');
    this.patientClient.subscribeToResponseOf('patient_lists_by_id');
    this.patientClient.subscribeToResponseOf('patient_created');
    this.patientClient.subscribeToResponseOf('patient_updated');
    this.patientClient.subscribeToResponseOf('patient_deleted');
    // Connect to the Kafka broker
    await this.patientClient.connect();
  }

  async onModuleDestroy() {
    await this.patientClient.close();
  }

  @Post()
  createPatient(@Body() patient: PatientDto): Observable<Patient> {
    return this.patientClient.send('patient_created', patient);
  }

  @Get()
  getPatients() :Promise<Patient> {
    return this.patientClient.send<Patient>('patient_lists', {}).toPromise();
  }

  @EventPattern('patient_lists.reply')
  async handlePatientsReply(@Payload() payload: PatientDto) {
    console.log('Received reply:', payload);
  }




  @Get(':id')
  getPatientById(@Param('id') id:number): Observable<Patient> {
    return this.patientClient.send('patient_lists_by_id', {id});
  }



  @Put(':id')
  updatePatient(@Param('id') id:number, @Body() patient: PatientDto): Observable<Patient> {
    return this.patientClient.send('patient_updated', {id, patient});
  }

  @Delete(':id')
  deletePatient(@Param('id') id:number): Observable<Patient> {
    console.log("We are here already", id)
    return this.patientClient.send('patient_deleted', {id});
  }
}
