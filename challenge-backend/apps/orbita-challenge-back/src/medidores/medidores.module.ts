import { Module, forwardRef } from '@nestjs/common';

import { DBModule } from '../infra/db/db.module';
import { MedidoresController } from './medidores.controller';
import { MedidoresService } from './medidores.service';
import { medidoresProvider } from './medidores.provider';

import { ClientesModule } from '../clientes/clientes.module';
import { FaturasModule } from '../faturas/faturas.module';

@Module({
  imports: [
    DBModule,
    forwardRef(() => FaturasModule),
    forwardRef(() => ClientesModule),
  ],
  controllers: [MedidoresController],
  providers: [...medidoresProvider, MedidoresService],
  exports: [MedidoresService],
})
export class MedidoresModule {}
