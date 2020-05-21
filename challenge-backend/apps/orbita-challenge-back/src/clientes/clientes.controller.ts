import { Controller, Body, Get, Post, Param } from '@nestjs/common';

import { Cliente } from './interfaces/cliente.interface';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ClientesService } from './clientes.service';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clienteService: ClientesService) {}

  @Post()
  async create(
    @Body() createClienteDto: CreateClienteDto,
  ): Promise<Cliente | void> {
    let cliente: Cliente;
    try {
      cliente = <Cliente>await this.clienteService.create(createClienteDto);
    } catch (error) {
      return console.error(error);
    }
    return cliente;
  }

  @Get()
  async findAll(): Promise<Cliente[] | void> {
    let clientes: Cliente[];
    try {
      clientes = await this.clienteService.findAll();
    } catch (e) {
      return console.error(e);
    }
    return clientes;
  }

  @Get(':clienteId')
  async getClienteById(
    @Param('clienteId') clienteId: string,
  ): Promise<Cliente | void> {
    let cliente: Cliente;
    try {
      cliente = await this.clienteService.get(clienteId);
    } catch (e) {
      return console.error(e);
    }
    return cliente;
  }
}
