function calculoItems() {
  const ItemsQuan = document.getElementById("items-heigth").value;
  const ItemsLarg = document.getElementById("items-width").value;
  const alturaItems = document.getElementById("constante-items").value;
  const user = document.getElementById("person-name-items").value;

  const quantidade = parseFloat(ItemsQuan);
  const largura = parseFloat(ItemsLarg);
  const altura = parseFloat(alturaItems);

  if (isNaN(quantidade) || isNaN(largura) || isNaN(altura)) {
    document.getElementById("valor-items").innerHTML =
      "Por favor, insira valores válidos";
    return;
  }

  console.log(
    `Quantidade: ${quantidade}, Largura: ${largura}, Altura: ${altura}`
  );

  // Comparação com tolerância
  if (Math.abs(largura - altura) < 0.0001) {
    // Caixa é quadrada
    console.log("Caixa quadrada detectada");
    calculoItemsQuadrada(quantidade, largura, altura, user);
  } else {
    // Caixa é retangular
    console.log("Caixa retangular detectada");
    calculoItemsRetangulo(quantidade, largura, altura, user);
  }
}

function calculoItemsRetangulo(quantidade, largura, altura, user) {
  const colunas = Math.ceil(Math.sqrt(quantidade));
  const fileiras = Math.ceil(quantidade / colunas);

  const comprimentoCaixa = colunas * largura;
  const alturaCaixa = fileiras * altura;

  console.log(`Retangular - Colunas: ${colunas}, Fileiras: ${fileiras}`);
  console.log(
    `Retangular - Comprimento: ${comprimentoCaixa}, Altura: ${alturaCaixa}`
  );

  document.getElementById(
    "valor-items"
  ).innerHTML = `${user}, a altura é ${alturaCaixa} e o comprimento é ${comprimentoCaixa}`;
}

function calculoItemsQuadrada(quantidade, largura, altura, user) {
  const intensPorLado = Math.ceil(Math.sqrt(quantidade));
  const ladoCaixa = Math.ceil(intensPorLado * Math.max(largura, altura));

  console.log(
    `Quadrada - Intens por lado: ${intensPorLado}, Lado da caixa: ${ladoCaixa}`
  );

  const mensagem = `${user}, o total ocupado é: ${ladoCaixa}`;
  document.getElementById("valor-items").innerHTML = mensagem;
}

function excluirCalculo() {
  document.getElementById("valor").innerHTML = "Cálculo excluído!";
  document.getElementById("valor-items").innerHTML = "Cálculo excluído!";
}

document.addEventListener("click", (event) => {
  const targetId = event.target.id;

  if (targetId === "btn-size") {
    showScreen("size-screen");
  } else if (targetId === "btn-back-size") {
    showScreen("home-screen");
  } else if (targetId === "btn-items") {
    showScreen("items-screen");
  } else if (targetId === "btn-back-items") {
    showScreen("home-screen");
  } else if (targetId === "calculate-size") {
    calculo();
  } else if (targetId === "calculate-items") {
    calculoItems();
  } else if (targetId === "delete-size" || targetId === "delete-items") {
    excluirCalculo();
  }
});
