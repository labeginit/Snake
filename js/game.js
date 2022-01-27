let initPos = {x: 0, y: 0}; 
let snakeLength = [{x: 1, y: 1}];
let lastUpdate = 0;
frog = generatePosition();
let speed = 5;

function start(time) {
    window.requestAnimationFrame(start);
    if((time - lastUpdate)/1000 < 1/speed){
        return;
    }
    lastUpdate = time;
    playGame();
}

window.requestAnimationFrame(start);
window.addEventListener('keydown', event =>{
  
    if(event.key == "ArrowLeft") {
        initPos.x = -1;
        initPos.y = 0;   
    } else if (event.key == "ArrowRight"){
        initPos.x = 1;
        initPos.y = 0;
    } else if (event.key == "ArrowUp"){
        initPos.x = 0;
        initPos.y = -1;
    } else if (event.key == "ArrowDown"){
        initPos.x = 0;
        initPos.y = 1;
    }
 
});

function playGame(){

    if(snakeLength[0].y === frog.y && snakeLength[0].x ===frog.x){
        // snake can eat and grow but does not die
        snakeLength.unshift({x: snakeLength[0].x + initPos.x, y: snakeLength[0].y + initPos.y});
       // generate a new frog     
       frog = generatePosition();
    }
 
    for (let i = snakeLength.length - 2; i>=0; i--) { 
        snakeLength[i+1] = {...snakeLength[i]};
    }

    snakeLength[0].x += initPos.x;
    snakeLength[0].y += initPos.y;

    //without this the whole game field will eventually be colored into the snake colour
    document.getElementById('grid-container').innerHTML = "";
    
    addMovingSnake();
    addFrog();
}
function generatePosition(){
    return {x: Math.floor(Math.random() * 24) + 1, y: Math.floor(Math.random() * 24) + 1};
} 
function addFrog(){
    frogItem = document.createElement('div');

    frogItem.style.gridColumnStart = frog.x;
    frogItem.style.gridRowStart = frog.y;
    console.log('frog coordinates: ' + frog.x + ' ' + frog.y);
    
    frogItem.classList.add('frog')
    document.getElementById('grid-container').appendChild(frogItem);
}

function addMovingSnake(){
    snakeLength.forEach((element, index)=>{
        snakeItem = document.createElement('div');

        snakeItem.style.gridColumnStart = element.x;
        snakeItem.style.gridRowStart = element.y;
        
        console.log('snake coordinates: ' + element.x + ' ' + element.y);

        if(index == 0){
            snakeItem.classList.add('snakehead');
        }
        else{
            snakeItem.classList.add('snakebody');
        }
        document.getElementById('grid-container').appendChild(snakeItem);
        console.log('snake: ' + snakeItem.innerHTML);
    });
}

