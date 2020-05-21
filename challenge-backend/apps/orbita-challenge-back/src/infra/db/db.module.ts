import { Module } from '@nestjs/common';

import { dbProvider } from './db.provider';

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DBModule {}
