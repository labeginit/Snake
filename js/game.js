frog =generatePosition();

frogItem = document.createElement('div');

frogItem.style.gridColumnStart = frog.x;
frogItem.style.gridRowStart = frog.y;

frogItem.classList.add('frog')
document.getElementById('grid-container').appendChild(frogItem);

function generatePosition(){
    return {x: Math.floor(Math.random() * 24) + 1, y: Math.floor(Math.random() * 24) + 1};
}