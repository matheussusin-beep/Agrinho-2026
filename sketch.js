function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let fazendeiro;
let lixos = [];
let venenos = [];
let agua = [];
let saude = 50;

function setup() {
  createCanvas(800, 400);

  fazendeiro = {
    x: 50,
    y: 300,
    tamanho: 40
  };

  for (let i = 0; i < 5; i++) {
    lixos.push({
      x: random(100, 750),
      y: random(100, 350)
    });
  }

  for (let i = 0; i < 3; i++) {
    venenos.push({
      x: random(100, 750),
      y: random(100, 350)
    });
  }

  for (let i = 0; i < 4; i++) {
    agua.push({
      x: random(100, 750),
      y: random(100, 350)
    });
  }
}

function draw() {
  background(135, 206, 235);

  // chão
  fill(90, 180, 90);
  rect(0, 250, width, 150);

  // sol
  fill("yellow");
  circle(700, 70, 80);

  moverFazendeiro();
  desenharPlantacao();

  // fazendeiro
  fill("blue");
  rect(fazendeiro.x, fazendeiro.y, fazendeiro.tamanho, fazendeiro.tamanho);

  // lixo
  for (let i = lixos.length - 1; i >= 0; i--) {
    fill("gray");
    rect(lixos[i].x, lixos[i].y, 25, 25);

    if (colidiu(lixos[i].x, lixos[i].y)) {
      lixos.splice(i, 1);
      saude += 5;
    }
  }

  // agrotóxicos
  for (let i = venenos.length - 1; i >= 0; i--) {
    fill("red");
    rect(venenos[i].x, venenos[i].y, 20, 30);

    if (colidiu(venenos[i].x, venenos[i].y)) {
      venenos.splice(i, 1);
      saude += 10;
    }
  }

  // água
  for (let i = agua.length - 1; i >= 0; i--) {
    fill("cyan");
    circle(agua[i].x, agua[i].y, 20);

    if (colidiu(agua[i].x, agua[i].y)) {
      agua.splice(i, 1);
      saude += 10;
    }
  }

  saude = constrain(saude, 0, 100);

  // barra de saúde
  fill(255);
  rect(20, 20, 200, 20);

  fill("green");
  rect(20, 20, saude * 2, 20);

  fill(0);
  textSize(16);
  text("Saúde da Plantação: " + saude + "%", 20, 60);

  // vitória
  if (saude >= 100) {
    fill("darkgreen");
    textSize(32);
    text("🌱 FUTURO SUSTENTÁVEL!", 220, 120);

    textSize(20);
    text("Você salvou a plantação!", 270, 160);
    noLoop();
  }
}

function moverFazendeiro() {
  if (keyIsDown(LEFT_ARROW)) {
    fazendeiro.x -= 4;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    fazendeiro.x += 4;
  }

  if (keyIsDown(UP_ARROW)) {
    fazendeiro.y -= 4;
  }

  if (keyIsDown(DOWN_ARROW)) {
    fazendeiro.y += 4;
  }

  fazendeiro.x = constrain(fazendeiro.x, 0, width - fazendeiro.tamanho);
  fazendeiro.y = constrain(fazendeiro.y, 0, height - fazendeiro.tamanho);
}

function colidiu(x, y) {
  return dist(fazendeiro.x, fazendeiro.y, x, y) < 35;
}

function desenharPlantacao() {
  fill(139, 69, 19);
  rect(350, 180, 100, 70);

  let tamanho = map(saude, 0, 100, 20, 80);

  fill("green");
  ellipse(400, 150, tamanho);
  ellipse(370, 180, tamanho);
  ellipse(430, 180, tamanho);
}
