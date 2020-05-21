import { Connection } from 'typeorm';

import { Cliente } from './clientes.entity';

export const clientesProvider = [
  {
    provide: 'ClienteRepository',
    useFactory: (connection: Connection) => connection.getRepository(Cliente),
    inject: ['DbConnectionToken'],
  },
];
