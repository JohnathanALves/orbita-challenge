import { createConnection } from 'typeorm';

import { Cliente } from '../../clientes/clientes.entity';
import { Fatura } from '../../faturas/faturas.entity';
import { Medidor } from '../../medidores/medidores.entity';

export const dbProvider = {
  provide: 'DbConnectionToken',
  useFactory: async () =>
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      entities: [Cliente, Fatura, Medidor],
      synchronize: true,
    }),
};
