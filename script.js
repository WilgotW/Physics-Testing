const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ground.y = canvas.height - canvas.height/10
});

class PhysicsObject{
    constructor(x, y, color){
        this.x = x ;
        this.y = y;
        this.color = color
        this.width = 50;
        this.height = 50;
        this.yVelocity = 0;
        this.xVelocity = 0;
        this.mass = 1;
        this.gravityScale = 1;
    }
    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
    }
    calcPhysics(){
        //gravity:
        if(this.y + this.height > ground.y){
            this.gravityScale = 0;
            this.y = ground.y - this.height
        }
        this.yVelocity += this.mass * this.gravityScale;
        this.y += this.yVelocity * this.gravityScale;
        
    }
}

const ground = {
    x: 0,
    y: canvas.height - canvas.height/10
}

let physObjects = [];
let unvalidBlocks = [];
const canvasBackground = 'white';
const mouse = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});
window.addEventListener('mousedown', function(){
    for(i = 0; i < physObjects.length; i++){
        if(mouse.x + physObjects[i].width > physObjects[i].x && mouse.x < physObjects[i].x + physObjects[i].width){
            if(mouse.y + physObjects[i].height > physObjects[i].y && mouse.y < physObjects[i].y + physObjects[i].height){
                unvalidBlocks.push(new PhysicsObject(mouse.x, mouse.y, 'rgba(255, 0, 0, 0.2)'));
                setTimeout(removeBlock, 100);
                return;
            }      
        }
    }
    if(mouse.y > ground.y){
        return;
    }
    physObjects.push(new PhysicsObject(mouse.x, mouse.y, 'black'));
});

function update(){
    refrech();
    physObjects.forEach(physObject => {
        physObject.calcPhysics();
        physObject.draw();
    });
    unvalidBlocks.forEach(block => {
        block.draw();
    });
    checkCollisions(physObjects);

    c.fillStyle = "black";
    c.fillRect(ground.x, ground.y, canvas.width, 3);

    
    requestAnimationFrame(update);
}
update();

function removeBlock(){
    unvalidBlocks.splice(0, 1);
}

function checkCollisions(arr){
    for(let i = 0; i < arr.length; i++){
        for(let z = i+1; z < arr.length; z++){
            //x touching:
            if(arr[i].x + arr[i].width > arr[z].x && arr[i].x < arr[z].x + arr[z].width){
                //y touching:
                if(arr[i].y + arr[i].height > arr[z].y && arr[i].y < arr[z].y + arr[z].height){
                    arr[z].gravityScale = 0;
                    arr[z].y = arr[i].y - arr[z].height;
                }
            }
            
        }
    }
    
}

function refrech(){
    c.fillStyle = canvasBackground;
    c.fillRect(0, 0, canvas.width, canvas.height);
}