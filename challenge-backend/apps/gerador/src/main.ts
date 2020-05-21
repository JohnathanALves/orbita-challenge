import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const appService = app.get(AppService);

  const user = await appService.createInitialUser();

  // gera dados para janeiro
  await appService.generateMedidores(31, 1, user, true);

  // gera dados para favereiro
  await appService.generateMedidores(29, 2, user, true);

  // gera dados para marco
  await appService.generateMedidores(31, 3, user, false);

  // gera dados para abril
  await appService.generateMedidores(30, 4, user, false);

  // gera dados para maio
  await appService.generateMedidores(10, 5, user, false);
}
bootstrap();
