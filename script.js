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
        this.width = 10;
        this.height = 10;
        this.mass = 0.5;
        this.moveSpeed = 1;
    }
    draw(){
        c.fillStyle = 'black';
        c.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
    calcPhysics(){
        //gravity:
        if(this.y + this.height/2 > ground.y){
            this.moveSpeed = 0;
        }
        this.y += this.mass * this.moveSpeed;
        
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
    c.fillStyle = "black";
    c.fillRect(ground.x, ground.y, canvas.width, 3);

    requestAnimationFrame(update);
}
update();

function checkCollisions(){
    //object a
    for(i = 0; i < physObjects.length, i++;){
        //checks with object b
        for(z = i+1; z < physObjects.length, z++;){

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
