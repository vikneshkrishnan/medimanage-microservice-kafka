import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {DoctorController} from "./doctor.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DOCTOR_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'doctor',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'doctor-consumer'
          }
        }

      }
    ]),
  ],
  providers: [],
  controllers: [DoctorController],
  exports: [
    ClientsModule.register([
      {
        name: 'DOCTOR_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'doctor',
            brokers: ['localhost:29092'],
          },
          consumer: {
            groupId: 'doctor-consumer'
          }
        }

      }
    ]),
  ]
})
export class DoctorModule {}
