const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");

const row = 20;
const col = 10;
const squareSize = 30;
const emptySquare = "lightcyan"; 
const bricks = [
    [Z,"red"],
    [S,"lime"],
    [T,"magenta"],
    [O,"gold"],
    [L,"orange"],
    [I,"darkturquoise"],
    [J,"blue"]
];

let score = 0;
let gameOver = false;

// desenha um quadrado nas colunas de 0 a 9 e nas linhas de 0 a 19
function drawSquare( x, y, color) {

    ctx.fillStyle = color;
    ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);

    ctx.strokeStyle = "lightgray";
    ctx.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);

};

// cria o board 
let board = [];
for(let r = 0; r < row; r++) {

    board[r] = [];
    for(let c = 0; c < col; c++){
        board[r][c] = emptySquare;

    };
};

// desenha o board
function drawBoard() {  

    for(let r = 0; r < row; r++){
        for(let c = 0; c < col; c++){
            drawSquare(c, r, board[r][c]);

        };
    };
};

drawBoard();

// cria as peças aleatoriamente
function randomPiece() {

    let random = Math.floor(Math.random() * bricks.length) // 7 peças -> index 0 ao 6
    return new Piece(bricks[random][0], bricks[random][1]);

}

// Controles
let p = randomPiece();
document.addEventListener("keydown", control);

function control(event) {

    switch (event.keyCode) {

        case 37:
        p.moveLeft();
        break;
        case 39:
        p.moveRight();
        break;
        case 38:
        p.rotate();
        break;
        case 40:
        p.moveDown();
        break;

    };
};

// Automatiza a queda das peças e define a dificuldade progressiva
let delay = 1000;

let timerId = setTimeout(function difficulty() {
    p.moveDown();

    if(score >= 40) {
       delay = 500;
    };

    if(score >= 80) {
    clearTimeout(timerId);
    delay = 250;
    };

    if(score >= 120) {
        clearTimeout(timerId);
        delay = 100;
    };

    if(score >= 150) {
        clearTimeout(timerId);
        delay = 80;
    };

    if(score >= 200) {
        clearTimeout(timerId);
        delay = 60;
    };

    timerId = setTimeout(difficulty, delay);


  }, delay);

// Apresenta a tela de Game Over e dá restart no jogo
function gameOverScreen () {
 
    document.removeEventListener("keydown", control);
    
    setTimeout (() => {

        ctx.textAlign = 'center';
        ctx.font = 'bold 55px Retro';
        ctx.fillStyle = "black";
        ctx.fillText("GAME", canvas.width / 2, canvas.height / 2.3);
        ctx.fillText("OVER", canvas.width / 2, canvas.height / 2.3 + 90);

    }, 500);

    setTimeout (() => {

        document.location = "";

    }, 3000);

};
