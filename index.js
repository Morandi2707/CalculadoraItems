const screens = {
  home: `
          <div id="home-screen" class="screen">
            <h1>Escolha uma Opção</h1>
            <button id="btn-items">Itens</button>
            <button id="btn-size">Tamanho</button>
          </div>
        `,
  size: `
          <div id="size-screen" class="screen" style="display: none;">
            <h1>Calculadora de Tamanho</h1>
            <label for="box-heigth">Altura:</label>
            <input id="box-heigth" type="number" placeholder="Ex: 10">
            <label for="box-width">Largura:</label>
            <input id="box-width" type="number" placeholder="Ex: 20">
            <label for="constante">Constante:</label>
            <input id="constante" type="number" placeholder="Ex: 5">
            <div>
              <label><input id="checkbox1-size" type="checkbox" value="3.5"> Constante 3.5</label>
              <label><input id="checkbox2-size" type="checkbox" value="7"> Constante 7</label>
            </div>
            <label for="person-name">Nome:</label>
            <input id="person-name" type="text" placeholder="Seu Nome">
            <p id="valor">Resultado será exibido aqui</p>
            <button id="calculate-size">Calcular</button>
            <button id="delete-size">Excluir Cálculo</button>
            <button id="btn-back-size">Voltar</button>
          </div>
        `,
  items: `
          <div id="items-screen" class="screen" style="display: none;">
            <h1>Calculadora de Itens</h1>
            <label for="items-heigth">Quantidade:</label>
            <input id="items-heigth" type="number" placeholder="Ex: 10">
            <label for="items-width">Largura:</label>
            <input id="items-width" type="number" placeholder="Ex: 20">
            <label for="constante-items">Altura:</label>
            <input id="constante-items" type="number" placeholder="Ex: 5">
            <div>
              <label><input id="checkbox1-items" type="checkbox" value="3.5"> Constante 3.5</label>
              <label><input id="checkbox2-items" type="checkbox" value="7"> Constante 7</label>
            </div>
            <label for="person-name-items">Nome:</label>
            <input id="person-name-items" type="text" placeholder="Seu Nome">
            <p id="valor-items">Resultado será exibido aqui</p>
            <button id="calculate-items">Calcular</button>
            <button id="delete-items">Excluir Cálculo</button>
            <button id="btn-back-items">Voltar</button>
          </div>
        `,
};

function showScreen(screenId) {
  // Itera por todas as telas e ajusta a visibilidade
  const screenIds = ["home-screen", "size-screen", "items-screen"];
  screenIds.forEach((id) => {
    const screen = document.getElementById(id);
    if (screen) {
      screen.style.display = id === screenId ? "block" : "none";
    }
  });
}

function calculo() {
  const user = document.getElementById("person-name").value;
  const constante = document.getElementById("constante").value;
  const caixaAltura = document.getElementById("box-heigth").value;
  const caixaLargura = document.getElementById("box-width").value;

  const altura = parseFloat(caixaAltura);
  const largura = parseFloat(caixaLargura);
  const divisor = parseFloat(constante);

  if (isNaN(altura) || isNaN(largura) || isNaN(divisor)) {
    document.getElementById("valor").innerHTML =
      "Por favor, insira valores válidos";
    return;
  }

  const calculo1 = Math.trunc(altura / divisor);
  const calculo2 = Math.trunc(largura / divisor);
  const resultado = calculo1 * calculo2;

  const mensagem = `${user}, o valor calculado é: ${resultado}`;
  document.getElementById("valor").innerHTML = mensagem;
}

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

  if (Math.abs(altura - largura) < 0.0001) {
    calculoItemsRetangulo(quantidade, largura, altura, user);
  } else {
    calculoItemsQuadrada(quantidade, largura, altura, user);
  }
}

function calculoItemsRetangulo(quantidade, largura, altura, user) {
  const colunas = Math.ceil(Math.sqrt(quantidade));
  const fileiras = Math.ceil(quantidade / colunas);

  const comprimentoCaixa = colunas * largura;
  const alturaCaixa = Math.ceil(fileiras * altura);
  const mensagem = `${user} a altura é ${alturaCaixa} e o comprimento é ${comprimentoCaixa}`;
  document.getElementById("valor-items").innerHTML = mensagem;
}

function calculoItemsQuadrada(quantidade, largura, altura, user) {
  const intensPorLado = Math.ceil(Math.sqrt(quantidade));
  const ladoCaixa = Math.ceil(intensPorLado * Math.max(largura, altura));

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

function updateInput() {
  const checkbox1Size = document.getElementById("checkbox1-size");
  const checkbox2Size = document.getElementById("checkbox2-size");
  const constante = document.getElementById("constante");

  if (checkbox1Size.checked) {
    checkbox2Size.checked = false;
    constante.value = checkbox1Size.value;
  }
  if (checkbox2Size.checked) {
    checkbox1Size.checked = false;
    constante.value = checkbox2Size.value;
  }

  const checkbox1Items = document.getElementById("checkbox1-items");
  const checkbox2Items = document.getElementById("checkbox2-items");
  const alturaItems = document.getElementById("constante-items");
  const larguraItems = document.getElementById("items-width");

  if (checkbox1Items.checked) {
    checkbox2Items.checked = false;
    alturaItems.value = checkbox1Items.value;
    larguraItems.value = checkbox1Items.value;
  }
  if (checkbox2Items.checked) {
    checkbox1Items.checked = false;
    alturaItems.value = checkbox2Items.value;
    larguraItems.value = checkbox2Items.value;
  }
}

document.addEventListener("change", (event) => {
  if (
    event.target.id === "checkbox1-size" ||
    event.target.id === "checkbox2-size" ||
    event.target.id === "checkbox1-items" ||
    event.target.id === "checkbox2-items"
  ) {
    updateInput();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.innerHTML = screens.home + screens.size + screens.items;
});
