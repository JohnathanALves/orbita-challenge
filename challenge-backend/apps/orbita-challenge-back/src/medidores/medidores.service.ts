import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Repository, Between } from 'typeorm';
import { Medidor } from './interfaces/medidor.interface';
import { RegisterMedicaoDto } from './dto/register-medicao.dto';
import { CreateMedidorDto } from './dto/create-medidores.dto';
import { ClientesService } from '../clientes/clientes.service';
import { FaturasService } from '../faturas/faturas.service';

@Injectable()
export class MedidoresService {
  constructor(
    @Inject('MedidoresRepository')
    private readonly MedidoresRepository: Repository<Medidor>,
    @Inject(forwardRef(() => ClientesService))
    private readonly clientesService: ClientesService,
    @Inject(forwardRef(() => FaturasService))
    private readonly faturasService: FaturasService,
  ) {}

  // create(createMedidorDto: CreateMedidorDto): Promise<Medidor> {
  //   return this.MedidoresRepository.save(createMedidorDto);
  // }

  findAll(): Promise<Medidor[]> {
    return this.MedidoresRepository.find();
  }

  get(medidorId: string): Promise<Medidor> {
    return this.MedidoresRepository.findOne(medidorId);
  }

  deleteOne(medidor: Medidor) {
    return this.MedidoresRepository.remove(medidor);
  }

  getMedidoresByFaturaId(faturaId: string): Promise<Medidor[]> {
    return this.MedidoresRepository.find({ where: { faturaId } });
  }

  getMedidoresByDateRange(
    dataInicial: Date,
    dataFinal: Date,
  ): Promise<Medidor[]> {
    return this.MedidoresRepository.find({
      dataMedicao: Between(dataInicial, dataFinal),
    });
  }

  async registrarMedicao(
    registerMedicaoDto: RegisterMedicaoDto,
  ): Promise<Medidor | void> {
    let cliente;
    try {
      // Busca id do cliente
      cliente = await this.clientesService.getClienteByCPF(
        registerMedicaoDto.cpfCliente,
      );
    } catch (e) {
      return console.error(e);
    }
    let fatura;
    try {
      // busca pela fatura que esteja em aberto.
      fatura = await this.faturasService.getCurrentFatura(cliente);
    } catch (e) {
      return console.error(e);
    }
    try {
      if (cliente && fatura) {
        // caso exista o cliente e fatura, cria a medicao
        let res = await this.MedidoresRepository.create(<CreateMedidorDto>{
          cliente,
          fatura,
          ...registerMedicaoDto,
        });
        if (res) {
          try {
            return await this.MedidoresRepository.save(res);
          } catch (e) {
            return console.error(e);
          }
        }
      }
    } catch (e) {
      return console.error(e);
    }
  }
}
