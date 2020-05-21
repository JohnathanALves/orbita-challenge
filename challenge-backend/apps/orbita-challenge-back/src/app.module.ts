import { Module, forwardRef } from '@nestjs/common';

import { ClientesModule } from './clientes/clientes.module';
import { FaturasModule } from './faturas/faturas.module';
import { MedidoresModule } from './medidores/medidores.module';

@Module({
  imports: [
    forwardRef(() => ClientesModule),
    forwardRef(() => FaturasModule),
    forwardRef(() => MedidoresModule),
  ],
})
export class AppModule {}
