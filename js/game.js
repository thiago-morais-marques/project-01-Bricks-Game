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
// Date.now() retorna o número de milisegundos decorridos desde 1 de janeiro de 1970 00:00:00
let dropStart = Date.now();
//console.log(dropStart); -> retorna um número estático após a função abaixo ser chamada
let gameOver = false;
let p = randomPiece();

// desenha um quadrado 
function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x * squareSize,y * squareSize, squareSize, squareSize);

    ctx.strokeStyle = "lightgray";
    ctx.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
};

let board = [];
for(let r = 0; r < row; r++){
    board[r] = [];
    for(let c = 0; c < col; c++){
        board[r][c] = emptySquare;
    };
};

// desenha o board
function drawBoard(){  
    for(let r = 0; r < row; r++){
        for(let c = 0; c < col; c++){
            drawSquare(c, r, board[r][c]);
        };
    };
};

drawBoard();

// cria as peças aleatoriamente
function randomPiece(){
    let random = Math.floor(Math.random() * bricks.length) // 7 peças -> index 0 ao 6
    return new Piece(bricks[random][0], bricks[random][1]);
}

// Controles

document.addEventListener("keydown",control);

function control(event){
    if(event.keyCode === 37){
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode === 38){
        p.rotate();
        dropStart = Date.now();
    }else if(event.keyCode === 39){
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode === 40){
        p.moveDown();
    };
};

// joga uma peça a cada 1 segundo


function drop(){
    let now = Date.now();
    //console.log(now); -> retorna milesegundos progressivos com o tempo
    let difference = now - dropStart;
    if( difference > 1000){
        p.moveDown();
        dropStart = Date.now();
    };

    /* O método window.requestAnimationFrame() fala para o navegador que deseja-se realizar uma 
    animação e pede que o navegador chame uma função específica para atualizar um quadro de animação 
    antes da próxima repaint (repintura). O método tem como argumento uma callback que deve ser 
    invocado antes da repaint. */
    if( !gameOver){
        requestAnimationFrame(drop);
    };
};

drop();

// Apresenta a tela de Game Over e dá restart no jogo
function gameOverScreen () {
    
    setTimeout (() => {
    window.cancelAnimationFrame(randomPiece(p.moveDown()));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.font = '30px Pixel';
    ctx.fillStyle = 'white';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    }, 100);

    setTimeout (() => {
        document.location = "";
    }, 2000);
};

