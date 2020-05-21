# Orbita development challenge -

_Feito por Johnathan Alves._

---

## Descrição Geral

A solução consiste em 3 modulos interdependentes. Cada módulo exporta seus serviços e controladores. Organizada em uma estrutura de **MonoRepo**.

1. Clientes
2. Faturas
3. Medidores

- Clientes - É responsável pelas operações principais referentes aos clientes, CRUD básico.

- Faturas - Realiza o CRUD básico de criação de faturas e implementa lógicas de negócio como operações de fechamento de faturas.

- Medidores - Módulo responsável por lidar com lógicas de registro de consumo.

![Arquitetura Geral do Back-end](/imgs/arquitetura-back-end.png)

### Casos de Uso Abordados

1. Caso em que existam falhas no envio de dados de consumo -
   - A modelagem de dados é feita de tal forma que ao recepcionar uma medição, o registro recebe a chave da fatura em aberto no momento. Dessa o consumo será cobrado na fatura corrente.
   - Como susgestão, pode-se criar uma tela de detalhamento na interface do aplicativo.
2. Caso em que não existam falhas
   - Esse é o caso ideal da solução. A fatura irá representar exatamente o valor consumido referente ao mês de referência.

### Gerador de dados para teste

Para validar o funcionamento da solução, foi criado uma **StandAloneApplication**, que possui acesso aos módulos _Core_, porém não é exposto na Web para requisição HTTP.

O **Gerador** cria um cliente inicial, gera medições durante 5 meses e efetua o fechamento manual da fatura (isso pode se transformar em um batch ou scheduled job do _NestJS_, para fehcamento massivo de faturas em um cenário produtivo).

---

## Como Executar

### Core API

    git clone https://github.com/JohnathanALves/orbita-challenge.git
    docker-compose up
    cd .orbita-challenge/challenge-backend/
    npm install
    npx nest start orbita-challenge-back

### Gerador de Dados

Após a inicialização do Nest, abra um novo terminal.

    cd .orbita-challenge/challenge-backend/
    npx nest start gerador

Para iniciar o serviço que irá popular com os dados iniciais para verificação da solução.

### Front-end

    cd .orbita-challenge/challenge-frontend/
    npm install
    npm start

---

## Endpoints API

| Modulo    | Método |          Path          |                                                                  Info |
| --------- | :----: | :--------------------: | --------------------------------------------------------------------: |
| Clientes  |  POST  |       /clientes        |                                                    Criar novo cliente |
| Clientes  |  GET   |       /clientes        |                                    Retorna lista de todos os clientes |
| Clientes  |  GET   | /clientes/{:clienteId} |                                    Retorna cliente com ID = clienteId |
| Faturas   |  GET   | /faturas/{:clienteId}  |                                   Retorna lista de faturas do cliente |
| Faturas   |  POST  |    /faturas/fechar     |                         Realiza fechamento da fatura enviada no Body. |
| Medidores |  GET   |  /dados/{:clienteId}   |                              Retorna todas a medicoes para o cliente. |
| Medidores |  POST  |     /dados/medicao     | Registra medicao baseada no modelo de dados para regsitro de medicao. |

---

## Data Transfer Objects - DTO

Seguindo as práticas do princípio do SOLID. Foram criadas interfaces e DTO's para interconexão entre módulos e criação de objetos. Abaixo vemos os DTO's criados para a solução.

#### RegisterMedicaoDTO

    // DTO para POST de registro de consumo.
     export class RegisterMedicaoDto {
      readonly cpfCliente: string;
      readonly dataMedicao: Date;
      readonly horaMedicao: number;
      readonly consumo: number;
    }

#### CreateMedidorDTO

    // DTO para escrever registro de consumo no banco de dados.
    export class CreateMedidorDto {
      readonly cliente: Cliente;
      readonly fatura: Fatura;
      readonly dataMedicao: Date;
      readonly horaMedicao: number;
      readonly consumo: number;
    }

#### CreateFaturaDTO

    //DTO para criacao de faturas.
    export class CreateFaturaDto {
      readonly cliente: Cliente;
      readonly totalConsumo?: number;
      readonly valorFatura?: number;
      readonly dataReferencia: Date;
      readonly situacaoFatura: 'F' | 'A';
      readonly situacaoPagamento: 'P' | 'A';
    }
