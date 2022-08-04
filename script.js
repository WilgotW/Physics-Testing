const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class PhysicsObject{
    constructor(x, y){
        this.x = x ;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.yVelocity = 0;
        this.xVelocity = 0;
        this.mass = 0.5;
        this.gravityScale = 1;
    }
    draw(){
        c.fillStyle = 'black';
        c.fillRect(this.x, this.y, this.width, this.height);
    }
    calcPhysics(){
        //gravity:
        if(this.y + this.height > ground.y){
            this.gravityScale = 0;
        }
        this.y += this.mass * this.gravityScale;
        
    }
}

const ground = {
    x: 0,
    y: canvas.height - canvas.height/10
}

let physObjects = [];
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
    spawnObject();
});

function update(){
    refrech();
    physObjects.forEach(physObject => {
        physObject.calcPhysics();
        physObject.draw();
        
        //check collisions:
        
    });
    checkCollisions();

    c.fillStyle = "black";
    c.fillRect(ground.x, ground.y, canvas.width, 3);

    
    requestAnimationFrame(update);
}
update();

function checkCollisions(){
    for(let i = 0; i < physObjects.length; i++){
        for(let z = i+1; z < physObjects.length; z++){
            //x touching:
            if(physObjects[i].x + physObjects[i].width > physObjects[z].x && physObjects[i].x < physObjects[z].x + physObjects[z].width){
                //y touching:
                if(physObjects[i].y + physObjects[i].height > physObjects[z].y && physObjects[i].y < physObjects[z].y + physObjects[z].height){
                    physObjects[z].gravityScale = 0;
                }
            }
            
        }
    }
    
}

function refrech(){
    c.fillStyle = canvasBackground;
    c.fillRect(0, 0, canvas.width, canvas.height);
}

function spawnObject(){
    physObjects.push(new PhysicsObject(mouse.x, mouse.y));
}
