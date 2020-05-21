import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Cliente } from '../clientes/clientes.entity';
import { Medidor } from '../medidores/medidores.entity';

@Entity()
export class Fatura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  totalConsumo: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  valorFatura: number;

  @Column('date')
  dataVencimento: Date;

  @Column()
  situacaoFatura: string;

  @Column()
  situacaoPagamento: string;

  @ManyToOne(
    type => Cliente,
    cliente => cliente.faturas,
  )
  cliente: Cliente;

  @OneToMany(
    type => Medidor,
    medicoes => medicoes.fatura,
  )
  medicoes: Medidor[];
}
