import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

import { FaturasService } from 'apps/orbita-challenge-back/src/faturas/faturas.service';
import { MedidoresService } from 'apps/orbita-challenge-back/src/medidores/medidores.service';
import { ClientesService } from 'apps/orbita-challenge-back/src/clientes/clientes.service';
import { Cliente } from 'apps/orbita-challenge-back/src/clientes/interfaces/cliente.interface';

@Injectable()
export class AppService {
  constructor(
    private readonly faturasService: FaturasService,
    private readonly medidoresService: MedidoresService,
    private readonly clientesService: ClientesService,
  ) {}

  async createInitialUser() {
    const initialUser = await this.clientesService.create({
      nome: 'Johnathan Alves',
      cpf: '11111111111',
      valorTarifa: 0.05,
      diaFechamentoFatura: 5,
      diaVencimentoFatura: 20,
      dataReferenciaPrimeiraFatura: moment('01/01/2020', 'DD/MM/YYYY').toDate(),
    });
    if (initialUser) {
      console.log(initialUser);
      return initialUser;
    } else {
      throw 'Error ao criar usuario inicial';
    }
  }

  async generateMedidores(
    numerdiasMes: number,
    mes: number,
    cliente: Cliente,
    pagaFatura: boolean,
  ) {
    // Medicoes de Janeiro
    console.log('Inserindo medicoes...');
    let i;
    for (i = 1; i < numerdiasMes; i++) {
      let medicao;
      try {
        medicao = await this.medidoresService.registrarMedicao({
          cpfCliente: '11111111111',
          dataMedicao: moment(`${i}/${mes}/2020`, 'DD/MM/YYYY').toDate(),
          horaMedicao: 9,
          consumo: Math.floor(Math.random() * 10),
        });
      } catch (e) {
        console.error(e);
        return console.error(`erro ao criar medicao`);
      }
    }

    console.log('Fechando Fatura Atual');
    let faturaAtual;
    try {
      faturaAtual = await this.faturasService.fechaFaturaAtual({
        clienteCPF: '11111111111',
      });
    } catch (error) {
      console.error(error);
      return console.error(`erro ao fechar fatura`);
    }
    console.log('fatura: ');
    console.log(faturaAtual);

    if (pagaFatura) {
      console.log('Pagando a fatura...');
      try {
        await this.faturasService.pagarFatura(faturaAtual.id);
      } catch (e) {
        return console.error(e);
      }
      console.log('fatura paga.');
    }

    console.log('Criando nova fatura...');
    let novaFatura;
    try {
      novaFatura = await this.faturasService.create({
        cliente: cliente,
        dataReferencia: moment(`01/${mes + 1}/2020`, 'DD/MM/YYYY').toDate(),
        situacaoFatura: 'A',
        situacaoPagamento: 'A',
      });
    } catch (error) {
      console.error(error);
      return console.error(`erro ao criar nova fatura`);
    }
    console.log('Fatura: ');
    console.log(novaFatura);
    console.log('Finalizado.');
  }
}
