import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Cliente } from '../clientes/clientes.entity';
import { Fatura } from '../faturas/faturas.entity';

@Entity()
export class Medidor {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('date')
  dataMedicao: Date;

  @Column('decimal', { precision: 2, scale: 0 })
  horaMedicao: number;

  @Column('real', { nullable: true })
  consumo: number;

  @ManyToOne(
    type => Cliente,
    cliente => cliente.medidores,
  )
  cliente: Cliente;

  @ManyToOne(
    type => Fatura,
    fatura => fatura.medicoes,
  )
  fatura: Fatura;
}
