import { Connection } from 'typeorm';

import { Medidor } from './medidores.entity';

export const medidoresProvider = [
  {
    provide: 'MedidoresRepository',
    useFactory: (connection: Connection) => connection.getRepository(Medidor),
    inject: ['DbConnectionToken'],
  },
];
