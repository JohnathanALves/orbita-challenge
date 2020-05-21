import { Connection } from 'typeorm';

import { Fatura } from './faturas.entity';

export const faturasProvider = [
  {
    provide: 'FaturasRepository',
    useFactory: (connection: Connection) => connection.getRepository(Fatura),
    inject: ['DbConnectionToken'],
  },
];
