import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cliente } from './interfaces/cliente.interface';
import { CreateClienteDto } from './dto/create-cliente.dto';

import { FaturasService } from '../faturas/faturas.service';
import { CreateFaturaDto } from '../faturas/dto/create-faturas.dto';

@Injectable()
export class ClientesService {
  constructor(
    @Inject('ClienteRepository')
    private readonly clienteRepository: Repository<Cliente>,
    @Inject(forwardRef(() => FaturasService))
    private readonly faturasService: FaturasService,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente | void> {
    // Ao criar o cliente, criaremos a primeira fatura.
    let novoCliente: Cliente;
    try {
      novoCliente = await this.clienteRepository.save(createClienteDto);
    } catch (e) {
      return console.error(e);
    }

    if (novoCliente) {
      try {
        this.faturasService.create(<CreateFaturaDto>{
          cliente: novoCliente,
          dataReferencia: createClienteDto.dataReferenciaPrimeiraFatura,
          situacaoFatura: 'A',
          situacaoPagamento: 'A',
        });
      } catch (e) {
        console.log(`entrei`);

        this.clienteRepository.remove(novoCliente);
        return console.error(e);
      }
      return novoCliente;
    }
  }

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  get(clienteId: string) {
    return this.clienteRepository.findOne(clienteId);
  }

  deleteOne(cliente: Cliente) {
    return this.clienteRepository.remove(cliente);
  }

  getClienteByCPF(cpf: string): Promise<Cliente> {
    return this.clienteRepository.findOne({ cpf: cpf });
  }
}
