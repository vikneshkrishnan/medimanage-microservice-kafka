import {Module} from '@nestjs/common';
import {PatientController} from './patient.controller';
import {ClientsModule, Transport} from '@nestjs/microservices';


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
  providers: [],
  controllers: [PatientController],
  exports: [
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
  ]
})
export class PatientModule {
}
