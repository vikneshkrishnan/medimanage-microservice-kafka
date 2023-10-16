import {NestFactory} from '@nestjs/core';
import {DoctorModule} from './doctor-svc/doctor.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      DoctorModule,
      {
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
    )
  ;
  await app.listen();
}

bootstrap().then(() => console.log('Doctor service is listening'));
