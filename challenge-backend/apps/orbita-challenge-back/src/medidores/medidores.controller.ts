import { Controller, Get, Post, Body } from '@nestjs/common';

import { Medidor } from './interfaces/medidor.interface';
import { RegisterMedicaoDto } from './dto/register-medicao.dto';

import { MedidoresService } from './medidores.service';

@Controller('dados')
export class MedidoresController {
  constructor(private readonly medidorService: MedidoresService) {}

  @Post('/medicao')
  async registrarMedicao(
    @Body() registerMedicaoDto: RegisterMedicaoDto,
  ): Promise<Medidor | void> {
    let medicao;
    try {
      medicao = await this.medidorService.registrarMedicao(registerMedicaoDto);
    } catch (e) {
      return console.log(e);
    }
    return medicao;
  }

  @Get()
  findAll(): Promise<Medidor[]> {
    return this.medidorService.findAll();
  }
}
