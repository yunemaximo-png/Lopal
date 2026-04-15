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
    cor: "silver",
    velocidade: {
        x: 0,
        y: 2
    },
    motorLigado: false,
    combustível: 1000
}

function mostraVelocidadeVertical(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.testBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    contexto.fillText(`Velocidade vertical: ${(10 * moduloLunar.velocidade.y ).toFixed(2)} %`,
    50,
    80
);
}

function mostrarCombustivel(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.testBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    contexto.fillText(`Combustível: ${(moduloLunar.combustível / 10 ).toFixed(0)} %`,
    50,
    60
);
}

function desenharFundo(){
    contexto.clearRect(0, 0, canvas.width, canvas.height)
    contexto.save();
    contexto.fillStyle = "#040417"
    contexto.fillRect(0,0, canvas.width, canvas.height);
    contexto.restore();
}

function desenharModuloLunar(){
    contexto.save();
    contexto.beginPath();
    //move a origem das cordenadas para o centro do módulo lunar
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5,
        moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();

    if(moduloLunar.motorLigado){
        desenharChama();
        moduloLunar.combustível--;
        if(moduloLunar.combustível <= 0){
            moduloLunar.motorLigado = false;
        }
    }

   
     
    contexto.restore();
}

function desenharChama(){
    contexto.beginPath();
    //define o ponto de origem da chama no canto inferior esquerdo do módulo
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    //desenha uma linha até o ponto inferior direito do módulo
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    //determinar o tamanho da chama
    //desenha uma linha aleatoria de posição y aleatoria entre a base do módulo de 35 pixels
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 35);
    contexto.closePath(); //desenha automaticamente a linha do vertice a origem
    contexto.fillStyle = "orange";
    contexto.fill();
}

function desenhar(){
 
    atracaoGravitacional();
    desenharFundo();
    desenharModuloLunar();
    mostrarCombustivel();
    mostraVelocidadeVertical();
 
    if (moduloLunar.posicao.y + moduloLunar.altura * 0.5 > canvas.height){
        if(moduloLunar.velocidade.y <= 0.5){
            mostrarResultado("Você pousou com sucesso!", cor = "green");
        }else{
            mostrarResultado("Você impactou o solo", cor = "red");
        }
        return
    }
    requestAnimationFrame(desenhar);
}

function mostrarResultado(mensagem, cor){
    contexto.font = "bold 40px Calibri";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle"
    contexto.fillStyle = cor;
    contexto.fillText(mensagem, canvas.width * 0.5, canvas.height * 0.5);
}

document.addEventListener('keydown', teclaPressionada);
 
function teclaPressionada(evento){
    if (evento.keyCode == 38 && moduloLunar.combustível > 0){
        moduloLunar.motorLigado = true;
    } 
 
}
 
document.addEventListener('keyup', teclaSolta);
 
function teclaSolta(evento){
    if(evento.keyCode == 38){
        moduloLunar.motorLigado = false;
    }
}
 
const gravidade = 0;

function atracaoGravitacional(){
    //atração gravitacional
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    moduloLunar.velocidade.y += gravidade;
 
    if(moduloLunar.motorLigado){
        moduloLunar.velocidade.y -= 0.0115
    }
}

desenhar();