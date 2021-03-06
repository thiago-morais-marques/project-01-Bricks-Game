class Piece {

    constructor (shape, color) {

        this.shape = shape;
        this.color = color;
    
        this.shapeIndex = 0; // inicia da primeira forma da peça 
        this.activeShape = this.shape[this.shapeIndex];
    
        // posição onde as peças são criadas
        this.x = 3;
        this.y = -2;

    };

    fill(color) {

        for(let r = 0; r < this.activeShape.length; r++) {

            for(let c = 0; c < this.activeShape.length; c++) {

                // desenha apenas quadrados ocupados
                if( this.activeShape[r][c]){
                    drawSquare(this.x + c,this.y + r, color);

                };
            };
        };

    };

    draw() {

        this.fill(this.color);

    };

    unDraw() {

        this.fill(emptySquare);  

    };

    moveDown() {

        if(!this.collision(0, 1, this.activeShape)) {

            this.unDraw();
            this.y++;
            this.draw();

        }else{

            // quando a peça chegar ao final, ela para e uma nova é gerada
            this.lock();
            p = randomPiece();

        };
    };

    moveRight() {

        if(!this.collision(1, 0, this.activeShape)) {

            this.unDraw();
            this.x++;
            this.draw();

        };
    };

    moveLeft() {

        if(!this.collision(-1, 0, this.activeShape)) {

            this.unDraw();
            this.x--;
            this.draw();

        };
    };

    rotate() {

        let nextPattern = this.shape[(this.shapeIndex + 1) % this.shape.length];
        let kick = 0;
        
        if(this.collision(0,0,nextPattern)){

            if(this.x > col / 2){

                // move um quadrado para a esquerda ou direita quando tentar girar ao lado da borda
                kick = -1; 

            }else{
               
                kick = 1; 

            };
        };
        
        if(!this.collision(kick,0,nextPattern)) {

            this.unDraw();
            this.x += kick;
            this.shapeIndex = (this.shapeIndex + 1) % this.shape.length; 
            this.activeShape = this.shape[this.shapeIndex];
            this.draw();

        };
    };

    lock() {
       
          for(let r = 0; r < this.activeShape.length; r++) {

            for(let c = 0; c < this.activeShape.length; c++) {

                // pula os quadrados vazios
                if(!this.activeShape[r][c]){
                    continue;
                };
                // Game Over
                if(this.y + r < 0){
                   
                    gameOver = true;
                   return gameOverScreen();

                    
                };

                // a peça é travada
                board[this.y + r][this.x + c] = this.color;

            };
        };

        // remove as linhas cheias
        for(let r = 0; r < row; r++){

            let isRowFull = true;
            for(let c = 0; c < col; c++){

                isRowFull = isRowFull && (board[r][c] != emptySquare);

            };

            if(isRowFull){

                // move as linhas acima da linha que foi apagada
                for(let y = r; y > 1; y--){

                    for(let c = 0; c < col; c++) {

                        board[y][c] = board[y - 1][c];

                    };
                };
                
                // exceção para quando chegar na última linha (não tem nada acima dela)
                for(let c = 0; c < col; c++) {

                    board[0][c] = emptySquare;

                };
                
                score += 10;
            };
        };

        // faz um update no board
        drawBoard();
        
        // faz um update no score
        scoreElement.innerHTML = score;

    };

    collision(x,y,piece) {

         for(let r = 0; r < piece.length; r++) {

            for(let c = 0; c < piece.length; c++) {

                // se o quadrado está vazio, é pulado
                if(!piece[r][c]){
                    continue;

                };

                // coordenadas da peça depois do movimento
                let newX = this.x + c + x;
                let newY = this.y + r + y;
                
                if(newX < 0 || newX >= col || newY >= row){
                    return true;

                };

                // pula essa opçãp, pois board[-1] quebra o jogo
                if(newY < 0){
                    continue;

                };
                // faz a checagem se tem um quadrado travado no lugar
                if(board[newY][newX] != emptySquare){
                    return true;

                };
            };
        };
        return false;
    };
};