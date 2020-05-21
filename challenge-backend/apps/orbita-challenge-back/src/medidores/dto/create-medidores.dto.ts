import { Fatura } from '../../faturas/interfaces/fatura.interface';
import { Cliente } from '../../clientes/interfaces/cliente.interface';

export class CreateMedidorDto {
  readonly cliente: Cliente;
  readonly fatura: Fatura;
  readonly dataMedicao: Date;
  readonly horaMedicao: number;
  readonly consumo: number;
}
