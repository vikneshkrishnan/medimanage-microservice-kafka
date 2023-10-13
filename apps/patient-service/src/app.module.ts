import { Module } from '@nestjs/common';
import {PatientModule} from "./patient-svc/patient.module";

@Module({
  imports: [PatientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
