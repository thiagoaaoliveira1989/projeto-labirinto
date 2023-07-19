const modeloLabirinto = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "W   W           W W W",
  "W W W WWWWWWWWW W W W",
  "W W     W     W W   W",
  "W WWWWWWW W WWW W W W",
  "W         W     W W W",
  "W WWW WWWWW WWWWW W W",
  "W W   W   W W     W W",
  "W WWWWW W W W WWW W F",
  "S     W W W W W WWWWW",
  "WWWWW W W W W W   W W",
  "W       W W   W W W W",
  "W WWWWWWW WWWWW W W W",
  "W       W       W   W",
  "WWWWWWWWWWWWWWWWWWWWW",
];


let posicaoJogador = { linha: 9, coluna: 0 }

const imagemJogador = document.createElement('img');
imagemJogador.classList.add("imgJogador");
imagemJogador.src = "./assets/imgs/goku.gif"

const imagemChegada = document.createElement('img');
imagemChegada.src = "./assets/imgs/bool.png";


function criarLabirinto(array) {
  const divLabirinto = document.querySelector("#labirinto");
  //div final que receberar todas as linhas
  divLabirinto.innerHTML = "";

  for (let linha = 0; linha < array.length; linha++) {
    const divLinha = document.createElement("div");
    divLinha.classList.add("linha");

    for (let coluna = 0; coluna < array[linha].length; coluna++) {
      const celula = document.createElement("div");
      celula.classList.add("celula");

      const imagemParede = document.createElement('img');
      imagemParede.src = "./assets/imgs/27.png"


      const celulaAtual = array[linha][coluna];

      if (celulaAtual === "W") {
        celula.appendChild(imagemParede);
        celula.classList.add("parede");

      } else if (linha === posicaoJogador.linha && coluna === posicaoJogador.coluna) {
        celula.appendChild(imagemJogador);

        celula.classList.add("jogador");
      } else if (celulaAtual === "F") {
        celula.appendChild(imagemChegada);
        celula.classList.add("chegada");
      } else {
        celula.innerText = ""
        celula.classList.add("caminho");
      }

      divLinha.appendChild(celula);
    }
    divLabirinto.appendChild(divLinha);
  }
}

let movimentos = 0;

function validaMovimento(posicao) {
  const totalLinhas = modeloLabirinto.length; // 15
  const totalColunas = modeloLabirinto[0].length;// 21
  const linha = posicao.linha;
  const coluna = posicao.coluna;

  if (linha < 0 || linha >= totalLinhas || coluna < 0 || coluna >= totalColunas || modeloLabirinto[linha][coluna] === "W") {
    return false;
  }

  setTimeout(() => {
    if (modeloLabirinto[linha][coluna] === "F") {
      pResultado = document.querySelector("#resultado");
      button = document.querySelector("#btn-resetar-jogo");
      button.style.display = 'block';
      pResultado.innerText = `Você venceu em ${movimentos} movimentos`;
      pResultado.style.display = 'block';
      imagemJogador.src = "./assets/imgs/goku2.gif"

    }

  }, 1000);

  return true;
}



document.addEventListener("keydown", (e) => {

  // Verifica se a imagem do jogador é "goku2"
  if (imagemJogador.src.includes("goku2.gif")) {
    return; // Se for "goku2", bloqueia o evento
  }



  const teclaPressionada = e.key;
  const posicaoAnterior = { ...posicaoJogador }; // Armazena a posição atual do jogador


  if (teclaPressionada === "ArrowUp") {
    imagemJogador.style.transform = "rotate(270deg)";
    posicaoJogador.linha -= 1;
  } else if (teclaPressionada === "ArrowDown") {
    imagemJogador.style.transform = "rotate(90deg)";
    posicaoJogador.linha += 1;
  } else if (teclaPressionada === "ArrowLeft") {
    imagemJogador.style.transform = "scaleX(-1)";
    posicaoJogador.coluna -= 1;
  } else if (teclaPressionada === "ArrowRight") {
    imagemJogador.style.transform = "rotate(360deg)";
    posicaoJogador.coluna += 1;
  }

  // Verifica se o movimento é válido com a função validaMovimento
  if (!validaMovimento(posicaoJogador)) {
    // Se o movimento não é válido, restaura a posição anterior
    posicaoJogador = { ...posicaoAnterior };
  } else {
    movimentos++;

    console.log(movimentos)
  }


  criarLabirinto(modeloLabirinto);


});



criarLabirinto(modeloLabirinto);


function resetarLabirinto() {


  // Esconder o resultado e o botão imediatamente
  pResultado.style.display = 'none';
  button.style.display = 'none';

  // Trocar a imagem do jogador imediatamente
  imagemJogador.src = "./assets/imgs/goku.gif"

  // Definir a posição do jogador e criar o labirinto após um pequeno atraso (500ms)
  posicaoJogador = { linha: 9, coluna: 0 };

  // Adicionar a classe com a transição ao elemento do labirinto
  const labirintoElement = document.querySelector('.gamer');
  labirintoElement.classList.add('gamer-transition');


  // Definir opacidade como 0, para fazer o labirinto desaparecer
  labirintoElement.style.opacity = '0';

  // Aguardar 50ms para dar tempo de a classe e o valor de opacidade serem aplicados
  setTimeout(function () {
    // Criar o novo labirinto (você pode chamar a função que cria o labirinto aqui)
    criarLabirinto(modeloLabirinto);

    // Definir a opacidade como 1 após um pequeno atraso (50ms) para fazer o labirinto reaparecer suavemente
    setTimeout(function () {
      labirintoElement.style.opacity = '1';
    }, 50);
  }, 500);
}


/* const btnReset = document.querySelector("#btn-resetar-jogo");

btnReset.addEventListener("click", () => {
  location.reload();
}) */