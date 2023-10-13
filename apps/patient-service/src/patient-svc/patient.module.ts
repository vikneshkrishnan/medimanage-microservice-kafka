import {Module} from '@nestjs/common';
import {PatientService} from './patient.service';
import {PatientController} from './patient.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {PrismaService} from "@app/shared/prisma/prisma.service";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PATIENT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'patient',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'patient-consumer'
          }
        }
      }
    ]),
  ],
  providers: [PatientService, PrismaService],
  controllers: [PatientController]
})
export class PatientModule {
}
