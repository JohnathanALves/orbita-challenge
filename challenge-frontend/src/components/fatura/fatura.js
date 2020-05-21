import React from "react";
import styled from "styled-components";
import * as moment from "moment";
import "moment/locale/pt-br";

const Row = styled.div`
  width: 18.5em;
`;

const StyledCard = styled.div`
  display: flex;
  height: 25.88em;
  width: 18.5em;
  background-color: #fff;
  margin-left: 3.63em;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleArea = styled.div`
  display: flex;
  margin-top: 1.7em;
  margin-bottom: 1.5em;
  margin-left: 18px;
`;

const FaturaTitle = styled.div`
  display: inline;
  font-size: 20pt;
  font-weight: 550;
  color: #000000;
`;
const FaturaRef = styled.div`
  flex: 1;
  align-self: center;
  color: #787878;
  font-size: 12pt;
  margin-top: 6px;
  margin-left: 7px;
  margin-bottom: 0;
`;

const handleColor = (color) => {
  switch (color) {
    case "R":
      return "#EF4056";
    case "G":
      return "#02C45A";
    case "P":
      return "#9808FF";
    default:
      return "#9808FF";
  }
};

const SituacaoFaturaBox = styled.div`
  align-self: center;
  padding: 2px 4px 4px 4px;
  /* width: 1em; */
  margin-left: auto;
  margin-right: 19px;
  border-radius: 4px;
  background-color: ${(props) => handleColor(props.color)};
`;
const SituacaoFatura = styled.div`
  font-weight: 100;
  color: #ffffff;
`;

const Resumos = styled.div`
  margin-left: 2em;
`;

const Consumo = styled.div`
  display: inline;
  font-size: 38pt;
  font-weight: bold;
  color: #000000;
`;

const ConsumoMB = styled.div`
  display: inline;
  font-size: 14pt;
  margin: 0;
  margin-left: 7px;
  color: #787878;
`;

const Tarifa = styled.div`
  margin-top: 13px;
  /* margin: 0; */
`;

const TarifaCifrao = styled.div`
  display: inline;
  font-size: 10pt;
  font-weight: 100;
  margin: 0;
  color: #999999;
`;

const TarifaValor = styled.div`
  display: inline;
  font-size: 16pt;
  font-weight: bold;
  margin: 0;
  margin-left: 5px;
  color: #02c45a;
`;

const Vencimento = styled.div`
  margin-bottom: 5.2em;
  margin-left: 2em;
`;

const VencimentoTexto = styled.p`
  margin-bottom: 5px;
  font-size: 11pt;
  color: #787878;
`;

const VencimentoData = styled.div`
  display: inline;
  font-size: 19pt;
  margin: 0;
  color: #000000;
`;
const VencimentoDia = styled.div`
  display: inline;
  font-size: 11pt;
  margin: 0;
  margin-left: 6px;
  color: #000000;
`;

const DIAS_SEMANA = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

const Fatura = (props) => {
  let { data } = props;

  let situacao;
  if (data.situacaoPagamento === "P") {
    situacao = { cor: "G", msg: "Pago" };
  } else if (moment(data.dataVencimento, "YYYY-MM-DD") > new Date()) {
    situacao = { cor: "P", msg: "Aberta" };
  } else {
    situacao = { cor: "R", msg: "Em Atraso" };
  }

  let mesReferencia = moment(data.dataVencimento, "YYYY-MM-DD")
    .subtract(1, "months")
    .startOf("month")
    .format("MMMM");
  let anoReferencia = moment(data.dataVencimento, "YYYY-MM-DD")
    .startOf("year")
    .format("YY");

  let referenciaString = `${mesReferencia
    .slice(0, 3)
    .toUpperCase()} ${anoReferencia}`;
  let vencimento = moment(data.dataVencimento, "YYYY-MM-DD").format("DD/MM");
  let diaSemana = moment(data.dataVencimento, "YYYY-MM-DD").weekday();

  return (
    <StyledCard>
      <Row>
        <TitleArea>
          <FaturaTitle>Fatura</FaturaTitle>
          <FaturaRef>{referenciaString}</FaturaRef>
          <SituacaoFaturaBox color={situacao.cor}>
            <SituacaoFatura>{situacao.msg}</SituacaoFatura>
          </SituacaoFaturaBox>
        </TitleArea>
      </Row>
      <Row>
        <Resumos>
          <Consumo>{parseInt(data.totalConsumo).toString()}</Consumo>
          <ConsumoMB>MB</ConsumoMB>
          <Tarifa>
            <TarifaCifrao>R$</TarifaCifrao>
            <TarifaValor>{data.valorFatura.replace(".", ",")}</TarifaValor>
          </Tarifa>
        </Resumos>
      </Row>
      <Vencimento>
        <VencimentoTexto> VENCIMENTO </VencimentoTexto>
        <VencimentoData>{vencimento}</VencimentoData>
        <VencimentoDia>{DIAS_SEMANA[diaSemana - 1]}</VencimentoDia>
      </Vencimento>
    </StyledCard>
  );
};

export default Fatura;
