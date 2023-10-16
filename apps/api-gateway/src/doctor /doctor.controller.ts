import {Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { DoctorDto } from "./dto/create-doctor.dto";
import { Observable } from "rxjs";
import { Doctor } from "./interfaces/doctor.interface";
import { ApiTags } from "@nestjs/swagger";



@Controller('doctor')
@ApiTags('doctor')
export class DoctorController implements OnModuleInit, OnModuleDestroy{
  constructor(
    @Inject('DOCTOR_SERVICE') private doctorClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Subscribe to reply topic
    this.doctorClient.subscribeToResponseOf('doctor_lists');
    this.doctorClient.subscribeToResponseOf('doctor_lists_by_id');
    this.doctorClient.subscribeToResponseOf('doctor_created');
    this.doctorClient.subscribeToResponseOf('doctor_updated');
    this.doctorClient.subscribeToResponseOf('doctor_deleted');
    // Connect to the Kafka broker
    await this.doctorClient.connect();
  }

  async onModuleDestroy() {
    await this.doctorClient.close();
  }


  @Post()
  createDoctor(@Body() doctor: DoctorDto): Observable<Doctor> {
    return this.doctorClient.send('doctor_created', doctor);
  }

  @Get()
  getDoctors() :Promise<Doctor> {
    return this.doctorClient.send<Doctor>('doctor_lists', {}).toPromise();
  }

  @Get(':id')
  getDoctorById(@Param('id') id:number): Observable<Doctor> {
    return this.doctorClient.send('doctor_lists_by_id', {id});
  }

  @Put(':id')
  updateDoctor(@Param('id') id:number, @Body() doctor: DoctorDto): Observable<Doctor> {
    return this.doctorClient.send('doctor_updated', {id, doctor});
  }

  @Delete(':id')
  deleteDoctor(@Param('id') id:number): Observable<Doctor> {
    return this.doctorClient.send('doctor_deleted', {id});
  }
}
