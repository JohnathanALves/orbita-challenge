import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Fatura } from '../faturas/faturas.entity';
import { Medidor } from '../medidores/medidores.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column('real')
  valorTarifa: number;

  @Column('decimal', { precision: 2, scale: 0 })
  diaFechamentoFatura: number;

  @Column('decimal', { precision: 2, scale: 0 })
  diaVencimentoFatura: number;

  @OneToMany(
    type => Medidor,
    medidores => medidores.cliente,
  )
  medidores: Medidor[];

  @OneToMany(
    type => Fatura,
    faturas => faturas.cliente,
  )
  faturas: Fatura[];
}
