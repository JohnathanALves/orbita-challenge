import { Cliente } from '../../clientes/interfaces/cliente.interface';
import { Fatura } from '../../faturas/interfaces/fatura.interface';

export interface Medidor {
  id: string;
  cliente: Cliente;
  fatura: Fatura;
  dataMedicao: Date;
  horaMedicao: number;
  consumo: number;
}
