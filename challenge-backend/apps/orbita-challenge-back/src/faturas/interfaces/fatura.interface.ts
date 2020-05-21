import { Cliente } from '../../clientes/interfaces/cliente.interface';

export interface Fatura {
  id: string;
  cliente: Cliente;
  totalConsumo?: number;
  valorFatura?: number;
  dataVencimento: Date;
  situacaoFatura: 'F' | 'A'; // F - Fechada e A - Aberta
  situacaoPagamento: 'P' | 'A'; // P - Pago e A - Aberto
}
