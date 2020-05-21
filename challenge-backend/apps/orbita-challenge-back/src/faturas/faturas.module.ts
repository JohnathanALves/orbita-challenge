import { Module, forwardRef } from '@nestjs/common';

import { DBModule } from '../infra/db/db.module';
import { FaturasService } from './faturas.service';
import { FaturasController } from './Faturas.controller';
import { faturasProvider } from './faturas.provider';
import { ClientesModule } from '../clientes/clientes.module';
import { MedidoresModule } from '../medidores/medidores.module';

@Module({
  imports: [
    DBModule,
    forwardRef(() => ClientesModule),
    forwardRef(() => MedidoresModule),
  ],
  controllers: [FaturasController],
  providers: [...faturasProvider, FaturasService],
  exports: [FaturasService],
})
export class FaturasModule {}
