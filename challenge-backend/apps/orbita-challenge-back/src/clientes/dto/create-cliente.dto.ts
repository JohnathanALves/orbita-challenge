export class CreateClienteDto {
  readonly nome: string;
  readonly cpf: string;
  readonly valorTarifa: number;
  readonly diaFechamentoFatura: number;
  readonly diaVencimentoFatura: number;
  readonly dataReferenciaPrimeiraFatura: Date; // isso aqui é só para facilitar a execução do challenge
}
