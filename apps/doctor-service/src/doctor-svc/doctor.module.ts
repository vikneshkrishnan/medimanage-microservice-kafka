import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {PrismaService} from "@app/shared/prisma/prisma.service";
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';

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
  providers: [DoctorService, PrismaService],
  controllers: [DoctorController]
})
export class DoctorModule {
}
