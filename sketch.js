// variaveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;

// variaveis velocidade bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//variaveis raquete
let xRaquete = 10;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 90;

let raio = diametro / 2;

let colisao = false;

//variaveis raquete oponente
let xRaqueteOponente = 583 
let yRaqueteOponente = 150
let velocidadeyOponente;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo
let raquetada;
let ponto;
let trilha;

// erro oponente
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  
}
    

function setup() {
  createCanvas(600, 400);
  //trilha.loop()
}

function draw() {
  background(0);
  desenhoBolinha();
  velocidadeBolinha();
  colisaoBolinha();
  nossaRaquete(xRaquete, yRaquete);
  movimentoNossaRaquete();
  //colisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  nossaRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluePlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
  
}

function desenhoBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function velocidadeBolinha(){
   xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function colisaoBolinha(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadexBolinha *= -1
  }
  if (yBolinha + raio > height || yBolinha -raio < 0){
    velocidadeyBolinha *= -1
  }
  
}

function nossaRaquete(x,y){
  rect(x, y, wRaquete, hRaquete);
}

function movimentoNossaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10
  }
}

function colisaoRaquete(){
  if (xBolinha - raio < xRaquete + wRaquete && yBolinha - raio < yRaquete + hRaquete && yBolinha + raio > yRaquete){
    velocidadexBolinha *= -1;
    raquetada.play()
  }
}

function colisaoRaqueteBiblioteca(x, y){
  hit = collideRectCircle(x, y , wRaquete, hRaquete, xBolinha, yBolinha, raio);
  if (hit){
    velocidadexBolinha *= -1;
    raquetada.play()
  }
}

function movimentaRaqueteOponente(){
   velocidadeyOponente = yBolinha - yRaqueteOponente - wRaquete / 2 -50;
  yRaqueteOponente += velocidadeyOponente +chanceDeErrar
  calculaChanceDeErrar()

}

function incluePlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255,140,0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26)
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    XBolinha = 23
    }
}
 