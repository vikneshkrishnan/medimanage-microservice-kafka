import { NestFactory } from '@nestjs/core';
import {AppModule} from "./app.module";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
  );


  await app.listen();
}
bootstrap().then(() => console.log('Patient service is listening'));
