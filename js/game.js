let snakeLength = [{x: 1, y: 1}];
frog =generatePosition();

document.getElementById('grid-container').innerHTML = "";
frogItem = document.createElement('div');

frogItem.style.gridColumnStart = frog.x;
frogItem.style.gridRowStart = frog.y;
console.log('frog coordinates: ' + frog.x + ' ' + frog.y);

frogItem.classList.add('frog')
document.getElementById('grid-container').appendChild(frogItem);

function generatePosition(){
    return {x: Math.floor(Math.random() * 24) + 1, y: Math.floor(Math.random() * 24) + 1};
}


snakeItem = document.createElement('div');
snakeItem.style.gridColumnStart = snakeLength[0].x;
snakeItem.style.gridRowStart = snakeLength[0].y;
    
console.log('snake coordinates: ' + snakeLength[0].x + ' ' + snakeLength[0].y);

snakeItem.classList.add('snakehead');
snakeItem.classList.add('snakebody');

document.getElementById('grid-container').appendChild(snakeItem);
   

