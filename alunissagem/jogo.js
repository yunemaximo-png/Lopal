//Jogo da Alnissagem
//yunemaximo-png
//08/04/2026
//Versão 0.1.0 1° compatibilidade 2° funcionalidade 3° correção de erros

/** @type {HTMLCanvasElement} */

let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

let moduloLunar = {
    posicao: {
        x: 100,
        y: 100
    },
    largura: 20,
    altura: 20,
    cor: "lightgray",
    velocidade: {
        x: 0,
        y: 2,
    }
}

function desenhar(){
    //atração gravitacional
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;

     //desenhar fundo da tela
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.save();
    contexto.fillStyle = "#150223";
    contexto.fillRect(0,0, canvas.width, canvas.height);
    contexto.restore();

    //desenhar módulo lunar
    contexto.save();
    contexto.beginPath();
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5, 
                    moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();
    contexto.restore();

    //Animação
    requestAnimationFrame(desenhar);
}

desenhar();