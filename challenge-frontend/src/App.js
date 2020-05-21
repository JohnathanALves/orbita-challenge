import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { obterDados } from "./services";
import { GlobalStyle } from "./theme/globalStyle";
import Header from "./components/header";
import Fatura from "./components/fatura";

const StyledContainer = styled.div`
  height: 100vh;
  flex: 1;
  background-color: #f7f7f7;
`;

const FaturaArea = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  /* overflow-y: hidden; */
  -webkit-scrollbar {
    display: none;
  }
`;
const RenderFaturas = ({ data }) => {
  if (data.length > 0) {
    return data.map((fatura) => <Fatura data={fatura} key={fatura.id} />);
  } else {
    return <div>Carregando...</div>;
  }
};

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    obterDados().then((res) => {
      setData(res);
    });
  }, [data.length]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <StyledContainer>
        <Header />
        <FaturaArea>
          <RenderFaturas data={data} />
        </FaturaArea>
      </StyledContainer>
    </React.Fragment>
  );
}

export default App;
