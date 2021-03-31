const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');

const box = 32;

const ground = new Image();
ground.src = 'HD-cloud_Background.jpg';

const foodImg = new Image();
foodImg.src = 'image_mapping.png';

const growSound = new Audio('sound.mp3');


let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

let score = 0;

let d;

document.addEventListener('keydown', direction);

function direction(event){
    if (event.keyCode == 37 && d != 'RIGTH') {
        d = 'LEFT';
    }else if (event.keyCode == 39 && d != 'LEFT') {
        d = 'RIGTH';
    }else if (event.keyCode == 38 && d != 'DOWN') {
        d = 'UP';
    }else if (event.keyCode == 40 && d != 'TOP') {
        d = 'DOWN';
    }
}

function collision(snakeHead, snakeArray){
    for (let i = 0; i < snakeArray.length; i++) {
        if (snakeHead.x == snake[i].x && snakeHead.y == snake[i].y) {
            return true;
        }
    }

    return false;
}


function drow(){
    ctx.drawImage(ground,0,0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y , box, box);

        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        
    }

    // drow food image
    ctx.drawImage(foodImg, food.x, food.y);

    //old head position of the snake 
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(d == 'LEFT'){
        snakeX -= box;
    }

    if(d == 'RIGTH'){
        snakeX += box;
    }

    if(d == 'UP'){
        snakeY -= box;
    }

    if(d == 'DOWN'){
        snakeY += box;
    }
    
    if (snakeX == food.x && snakeY == food.y) {
        growSound.play();
        score ++;
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        };
    }else{
        snake.pop();
    }

    // new head position

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    
    if(snakeX < 0 || snakeX > 18 * box 
        || snakeY < 0 || snakeY > 18 * box 
        || collision(newHead, snake)){
        clearInterval(game);

        ctx.fillStyle = 'black';
        ctx.font = '45px Changa one';
        ctx.fillText('GAME OVER',4.5*box,9*box);    
    }

    snake.unshift(newHead);

    // drow result number 
    ctx.fillStyle = 'black';
    ctx.font = '25px Georgia';
    ctx.fillText(score, 1*box, 1*box);

}


let game = setInterval(drow, 175);

