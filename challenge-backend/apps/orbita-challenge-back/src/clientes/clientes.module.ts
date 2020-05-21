import { Module, forwardRef } from '@nestjs/common';

import { DBModule } from '../infra/db/db.module';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { clientesProvider } from './clientes.provider';
import { FaturasModule } from '../faturas/faturas.module';

@Module({
  imports: [DBModule, forwardRef(() => FaturasModule)],
  controllers: [ClientesController],
  providers: [...clientesProvider, ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}
