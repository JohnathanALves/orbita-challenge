const obterDados = async () => {
  return (await fetch(`http://localhost:3001/faturas`)).json();
};

export { obterDados };
