//Jogo da Alnissagem
//yunemaximo-png
//08/04/2026
//Versão 0.1.0 1° compatibilidade 2° funcionalidade 3° correção de erros

/** @type {HTMLCanvasElement} */

//Modelo
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");
const gravidade = 0.01;
let lancamento = (Math.round(Math.random()) == 0);//Variável booleana pseudoaleatória
let estrelas = [];

for(let i = 0; i < 500 ; i++){
    estrelas[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(2 * Math.random()),
        brilho: 1.0,
        apagando: true,
        cintilacao: 0.05 * Math.random()
    }
}

 
let moduloLunar = {
    posicao: {
        x: lancamento ? 100: 700,
        y: 100
    },
    angulo: lancamento ? -Math.PI/2 : Math.PI/2,
    largura: 20,
    altura: 20,
    cor: "#647480",
    velocidade:{
        x: lancamento? 2: -2,
        y: 0,
    },
    motorLigado: false,
    combustivel: 1000,
    rotacaoAntiHorario: false,
    rotacaoHorario: false
}

//Visualização

function mostrarIndicador(mensagem, x, y){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "left";
    contexto.testBaseLine = "middle";
    contexto.fillStyle = "#6403ff";
    contexto.fillText(
        mensagem,
        x,
        y
    );
}

function mostrarResultado(mensagem, cor){
    contexto.font = "bold 40px Calibri";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = cor;
    contexto.fillText(mensagem, canvas.width * 0.5, canvas.height * 0.5);
}

function mosrtarVelocidadeHorizontal(){
    mostrarIndicador(
        `Velocidade Horizontal: ${(10 * moduloLunar.velocidade.x).toFixed(2)}`,
        50,
        40
    );
}
 
function mostrarVelocidadeVertical(){
    mostrarIndicador(
        `Velocidade Vertical: ${(10 * moduloLunar.velocidade.y).toFixed(2)}`,
        50,
        60
    );
}

function mostrarAngulo(){
    mostrarIndicador(
        `Ângulo: ${(moduloLunar.angulo * 100 / Math.PI ).toFixed(0)}`,
        400,
        60
    );
}

function mostrarAltitude(){
    mostrarIndicador(
    `Altitude: ${(10 * canvas.height - moduloLunar.posicao.y).toFixed(0)}`,
        400,
        40
    );
}
 
function mostrarCombustivel(){
    mostrarIndicador(
        `Combustível: ${(moduloLunar.combustivel / 10 ).toFixed(0)}%`,
        50,
        80
    );
}
 
function desenharFundo(){
    contexto.clearRect(0, 0, canvas.width, canvas.height)
    contexto.save();
    contexto.fillStyle = "#230332"
    contexto.fillRect(0,0, canvas.width, canvas.height);
    contexto.restore();
}

function desenharEstrelas(){
    contexto.save();
    contexto.fillStyle = "#230332"
    contexto.fillRect(0,0, canvas.width, canvas.height);
    for(let i = 0; i < estrelas.length; i++){
        let estrela = estrelas[i];
        contexto.beginPath();
        contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2*Math.PI);
        contexto.closePath();
        contexto.fillStyle = `rgba(255, 255, 255, ${estrela.brilho})`;
        //contexto.fillStyle = "rgba(255, 255, 255, " + estrela.brilho + ")";
        contexto.fill();
        if(estrela.apagando){
            estrela.brilho -= estrela.cintilacao;
            if(estrela.brilho <= 0.1){
                estrela.apagando = false;
            }
        } else {
            estrela.brilho += estrela.cintilacao;
            if(estrela.brilho > 0.95){
                estrela.apagando = true;
            }
        }
    }
    contexto.restore();
}

function desenharModuloLunar(){
    contexto.save();
    contexto.beginPath();
    //move a origem das coordenadas para o centro do modulo lunar
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5,
        moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();
 
    if(moduloLunar.motorLigado){
        desenharChamaA();
        desenharChamaB();
        consumirCombustivel();
    }
   
    contexto.restore();
 
}

function desenharChamaA(){
    contexto.beginPath();
    //define o ponto de origem da chama no canto inferior esquerdo do modulo
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    //desenha a linha até o ponto inferior direito do modulo
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    //determinar o tamanho da chama
    //desenha uma linha de posicao y aleatoria entre a base de modulo e 35 pixels
    contexto.lineTo(0, moduloLunar.altura *0.5 + Math.random() * 35);
    contexto.closePath();//desenha automaticamente a linha do vértice a origem
    contexto.fillStyle = "rgb(230, 109, 10)";
    contexto.fill();
}

function desenharChamaB(){
    contexto.beginPath();
    //define o ponto de origem da chama no canto inferior esquerdo do modulo
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    //desenha a linha até o ponto inferior direito do modulo
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    //determinar o tamanho da chama
    //desenha uma linha de posicao y aleatoria entre a base de modulo e 35 pixels
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 25);
    contexto.closePath();//desenha automaticamente a linha do vértice a origem
    contexto.fillStyle = "#e0c410";
    contexto.fill();
}
function desenhar(){

    desenharFundo();
    desenharEstrelas();
    atracaoGravitacional();
    desenharModuloLunar();
    mostrarVelocidadeVertical();
    mosrtarVelocidadeHorizontal();
    mostrarCombustivel();
    mostrarAltitude();
    mostrarAngulo();
    mostrarIndicador();
    
    
    if(encerrarJogo()){
        return;
    }

    requestAnimationFrame(desenhar);
}

//Controle
document.addEventListener('keydown', teclaPressionada);

function encerrarJogo(){
   if(moduloLunar.posicao.y + moduloLunar.altura * 0.5 > canvas.height){
        if(moduloLunar.velocidade.y <= 0.5 && Math.abs(moduloLunar.velocidade.x )<= 0.5 
            && Math.abs(moduloLunar.angulo) <= 5){
             mostrarResultado("Você pousou com sucesso!", cor = "green")
        }else {
            mostrarResultado("Morte", cor = "red")
        }
        return true;
    }
    return false;
}

function teclaPressionada(evento){
    if (evento.key == "ArrowUp" && moduloLunar.combustivel > 0){
        moduloLunar.motorLigado = true;
    } else if(evento.key == "ArrowRight" ){
        moduloLunar.rotacaoHorario = true;
    } else if(evento.key == "ArrowLeft" ){
        moduloLunar.rotacaoAntiHorario = true;
    }
}
 
document.addEventListener('keyup', teclaSolta)
 
function teclaSolta(evento){
    if(evento.key == "ArrowUp"){
        moduloLunar.motorLigado = false
    } else if(evento.key == "ArrowRight"){
        moduloLunar.rotacaoHorario = false;
    } else if(evento.key == "ArrowLeft"){
        moduloLunar.rotacaoAntiHorario = false;
    }
}

function consumirCombustivel(){
        moduloLunar.combustivel--;
        if(moduloLunar.combustivel <= 0){
            moduloLunar.motorLigado = false;
        }
}

function atracaoGravitacional(){
    //atração gravitacional
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    moduloLunar.velocidade.y += gravidade;

    if(moduloLunar.rotacaoHorario){
        moduloLunar.angulo += Math.PI/180;
    } else if(moduloLunar.rotacaoAntiHorario){
        moduloLunar.angulo -= Math.PI/180;
    }
 
    if(moduloLunar.motorLigado){
        moduloLunar.velocidade.y -= 0.0115 * Math.cos(moduloLunar.angulo);
        moduloLunar.velocidade.x += 0.0115 * Math.sin(moduloLunar.angulo);
    }
}
 
desenhar();
