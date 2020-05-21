import { Controller, Get, Post, Body } from '@nestjs/common';
import { Fatura } from './interfaces/fatura.interface';
import { FaturasService } from './faturas.service';
import { FecharFaturaDto } from './dto/fechar-fatura.dto';

@Controller('faturas')
export class FaturasController {
  constructor(private readonly faturasService: FaturasService) {}
  @Get()
  findAll(): Promise<Fatura[]> {
    return this.faturasService.findAll();
  }

  @Post('/fechar')
  fecharFaturaAtual(@Body() fecharFaturaDto: FecharFaturaDto) {
    return this.faturasService.fechaFaturaAtual(fecharFaturaDto);
  }
}
