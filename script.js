function init(){
    gameover = false;
    canvas = document.getElementById('mycanvas');
    W = canvas.height = 600;
    H = canvas.width = 600;
    pen = canvas.getContext('2d')
    pen.fillStyle ="blue"
    foodImg = new Image();
	foodImg.src = "Assets/apple.png";
    cs = 40;
    score = 0;
    snake = {
        initLen: 1,
        color: "blue",
        cells: [],
        direction: "right",
        createSnake:function(){
            for(var i=this.initLen; i>0; i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake: function(){
            for(var i=0; i<this.cells.length; i++){
                pen.fillRect(this.cells[i].x*cs-4,this.cells[i].y*cs+1,cs-2,cs-2);
            }
        },
        updateSnake: function(){
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            if(headX == food.x && headY == food.y){
                food = getRandomFood();
                score++;
            }else{
                this.cells.pop();
            }
            
            pen.fillStyle =this.color;

            var nextX, nextY;
            if(this.direction=="right"){
                nextX = headX +1;
                nextY = headY;
            }
            else if(this.direction=="left"){
                nextX = headX -1;
                nextY = headY;
            }
            else if(this.direction=="down"){
                nextX = headX;
                nextY = headY +1;
            }
            else if(this.direction=="up"){
                nextX = headX;
                nextY = headY -1;
            }
            this.cells.unshift({x:nextX,y:nextY});

            var lastx =Math.round(W/cs);
            var lasty =Math.round(H/cs);

            if(this.cells[0].y<0 || this.cells[0].x<0 || this.cells[0].x > lastx || this.cells[0].y >lasty){
                gameover = true;
            }
        }
    };
    food = getRandomFood();
    snake.createSnake();
    
        
}
    



function draw(){
    pen.clearRect(0,0,W,H)
    pen.drawImage(foodImg,food.x*cs-4,food.y*cs+1,cs-2,cs-2);
    snake.drawSnake();
    // pen.font = "25px";
    // pen.fillText(score,50,50)
}

function update(){
    snake.updateSnake();
    document.getElementById('updateScore').innerHTML = score;
}
function getRandomFood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);
    var food = {
        x: foodX,
        y: foodY,
        color: "red"
    }
    return food;
}

function gameLoop(){
    if(gameover==true){
        clearInterval(myInterval);
        alert("Game Over... your score is: "+score);
    }
    draw();
    update();
}

init();
draw();
// document.addEventListener(keydown)

function keyPressed(e){
    if(e.key=="ArrowRight"){snake.direction="right"}
    else if(e.key=="ArrowLeft"){snake.direction="left"}
    else if(e.key=="ArrowUp"){snake.direction="up"}
    else if(e.key=="ArrowDown"){snake.direction="down"}
    else if(e.key==" "){
        init();
        myInterval = setInterval(gameLoop, 100); 
    }
} 
document.addEventListener('keydown', keyPressed)
