import { Module, forwardRef } from '@nestjs/common';
import { FaturasModule } from 'apps/orbita-challenge-back/src/faturas/faturas.module';
import { MedidoresModule } from 'apps/orbita-challenge-back/src/medidores/medidores.module';
import { ClientesModule } from 'apps/orbita-challenge-back/src/clientes/clientes.module';

import { AppService } from './app.service';

@Module({
  imports: [FaturasModule, MedidoresModule, ClientesModule],
  providers: [AppService],
})
export class AppModule {}
