import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as moment from 'moment';

import { CreateFaturaDto } from './dto/create-faturas.dto';
import { FecharFaturaDto } from './dto/fechar-fatura.dto';

import { Fatura } from './interfaces/fatura.interface';
import { Cliente } from '../clientes/interfaces/cliente.interface';

import { ClientesService } from '../clientes/clientes.service';
import { MedidoresService } from '../medidores/medidores.service';
import e = require('express');

@Injectable()
export class FaturasService {
  constructor(
    @Inject('FaturasRepository')
    private readonly FaturasRepository: Repository<Fatura>,
    @Inject(forwardRef(() => ClientesService))
    private readonly clientesService: ClientesService,
    @Inject(forwardRef(() => MedidoresService))
    private readonly medidoresService: MedidoresService,
  ) {}

  async create(createFaturaDto: CreateFaturaDto): Promise<Fatura | void> {
    // ao criar uma fatura, seta o vencimento para o mes seguinte da data de referencia.
    let cliente;
    try {
      cliente = await this.clientesService.get(createFaturaDto.cliente.id);
    } catch (e) {
      return console.error(e);
    }
    if (cliente) {
      const vencimento = moment(createFaturaDto.dataReferencia, 'DD/MM/YYYY')
        .add(1, 'months')
        .date(cliente.diaVencimentoFatura);
      return this.FaturasRepository.save({
        dataVencimento: vencimento,
        ...createFaturaDto,
      });
    } else {
      return console.error(`Error: cliente não encontrado.`);
    }
  }

  async pagarFatura(faturaId: string): Promise<Fatura | void> {
    let fatura: Fatura;
    try {
      fatura = await this.get(faturaId);
    } catch (error) {
      return console.error(error);
    }
    fatura.situacaoPagamento = 'P';
    try {
      fatura = await this.FaturasRepository.save(fatura);
    } catch (error) {
      return console.error(error);
    }
    return fatura;
  }

  findAll(): Promise<Fatura[]> {
    return this.FaturasRepository.find({ where: { situacaoFatura: 'F' } });
  }

  get(faturaId: string) {
    return this.FaturasRepository.findOne({ where: { id: faturaId } });
  }

  deleteOne(fatura: Fatura) {
    return this.FaturasRepository.remove(fatura);
  }

  getCurrentFatura(cliente: Cliente): Promise<Fatura> {
    return this.FaturasRepository.findOne({
      where: { situacaoFatura: 'A', clienteId: cliente.id },
    });
  }

  async fechaFaturaAtual(
    fecharFaturaDto: FecharFaturaDto,
  ): Promise<Fatura | void> {
    let cliente;
    try {
      // busca pelo cliente
      cliente = await this.clientesService.getClienteByCPF(
        fecharFaturaDto.clienteCPF,
      );
    } catch (e) {
      return console.error(e);
    }
    if (cliente) {
      let faturaAtual;
      try {
        // busca fatura atual;
        faturaAtual = await this.getCurrentFatura(cliente);
      } catch (e) {
        return console.error(e);
      }
      if (faturaAtual) {
        let medicoes;
        try {
          // busca lista de medicoes
          medicoes = await this.medidoresService.getMedidoresByFaturaId(
            faturaAtual.id,
          );
        } catch (e) {
          return console.error(e);
        }

        let consumo = medicoes.reduce((acc, val) => acc + val.consumo, 0);

        faturaAtual.totalConsumo = consumo;
        faturaAtual.valorFatura = consumo * cliente.valorTarifa;
        faturaAtual.situacaoFatura = 'F'; // seta flag para fatura fechada.
        return this.FaturasRepository.save(faturaAtual);
      } else {
        console.error(`não encontrou a fatura`);
      }
    } else {
      console.error(`não encontrou o cliente`);
    }
  }
}
