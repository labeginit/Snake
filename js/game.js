let direction = { x: 0, y: 0 };
let snakePosition = [{ x: 1, y: 1 }];
let lastUpdate = 0;
frog = generatePosition();
let speed = 5;
const directions = [{ x: 0, y: 1 }, { x: 1, y: 0 }]  // two possible start directions
const up = "ArrowUp";
const down = "ArrowDown";
const left = "ArrowLeft";
const right = "ArrowRight";
scr = 0;


function start(time) {
    window.requestAnimationFrame(start);
    if ((time - lastUpdate) / 1000 < 1 / speed) {
        return;
    }
    lastUpdate = time;
    playGame();
}

window.requestAnimationFrame(start);
window.addEventListener('keydown', event => {

    if (event.key == left) {
        direction.x = -1;
        direction.y = 0;
    } else if (event.key == right) {
        direction.x = 1;
        direction.y = 0;
    } else if (event.key == up) {
        direction.x = 0;
        direction.y = -1;
    } else if (event.key == down) {
        direction.x = 0;
        direction.y = 1;
    }

});

function playGame() {
    if (dead(snakePosition)) {
        //place the snake to the beginning and make a new frog, then how alert
        direction = directions[Math.round(Math.random())];
        frog = generatePosition();
        scr = 0;
        document.getElementsByClassName('score')[0].innerHTML = scr;
        alert("Game Over!");
    }

    if (snakePosition[0].y === frog.y && snakePosition[0].x === frog.x) {
        // snake can eat and grow but does not die
        snakePosition.unshift({ x: snakePosition[0].x + direction.x, y: snakePosition[0].y + direction.y });
        // generate a new frog     
        frog = generatePosition();
        scr++;
        //score = document.getElementsByClassName('score')[0].value;

        document.getElementsByClassName('score')[0].innerHTML = scr;
    }

    for (let i = snakePosition.length - 2; i >= 0; i--) {
        snakePosition[i + 1] = { ...snakePosition[i] };
    }

    snakePosition[0].x += direction.x;
    snakePosition[0].y += direction.y;

    //without this the whole game field will eventually be colored into the snake colour
    document.getElementById('grid-container').innerHTML = "";

    addMovingSnake();
    addFrog();
}
function generatePosition() {
    return { x: Math.floor(Math.random() * 24) + 1, y: Math.floor(Math.random() * 24) + 1 };
}
function addFrog() {
    frogItem = document.createElement('div');

    frogItem.style.gridColumnStart = frog.x;
    frogItem.style.gridRowStart = frog.y;

    frogItem.classList.add('frog')
    document.getElementById('grid-container').appendChild(frogItem);
}

function addMovingSnake() {
    snakePosition.forEach((element, index) => {
        snakeItem = document.createElement('div');

        snakeItem.style.gridColumnStart = element.x;
        snakeItem.style.gridRowStart = element.y;

        if (index == 0) {
            snakeItem.classList.add('snakehead');
        }
        else {
            snakeItem.classList.add('snakebody');
        }
        document.getElementById('grid-container').appendChild(snakeItem);
    });
}

function dead(snake) {
    // hit the wall
    if (snake[0].x >= 24 || snake[0].x <= 0 || snake[0].y >= 24 || snake[0].y <= 0) {
        snakePosition = [{ x: 1, y: 1 }];
        return true;
    }

    // has eaten itself
    for (let i = 1; i < snakePosition.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            snakePosition = [{ x: 1, y: 1 }];
            return true;
        }
    }

    return false;
}

