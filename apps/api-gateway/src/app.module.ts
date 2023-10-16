import { Module } from '@nestjs/common';
import {PatientModule} from "./patient/patient.module";
import { DoctorModule } from './doctor /doctor.module';
@Module({
  imports: [PatientModule, DoctorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
