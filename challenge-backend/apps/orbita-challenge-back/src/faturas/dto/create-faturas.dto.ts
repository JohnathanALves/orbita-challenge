import { Cliente } from '../../clientes/interfaces/cliente.interface';

export class CreateFaturaDto {
  readonly cliente: Cliente;
  readonly totalConsumo?: number;
  readonly valorFatura?: number;
  readonly dataReferencia: Date;
  readonly situacaoFatura: 'F' | 'A';
  readonly situacaoPagamento: 'P' | 'A';
}
