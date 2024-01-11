let board;
let boardwidth = 750;
let boardheight = 250;
let context;

//dino
let dinowidth = 88;
let dinoheight = 94;
let dinoX = 50;
let dinoY = boardheight - dinoheight;
let dinoImg;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinowidth,
    height: dinoheight
};
//cactus
let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY= boardheight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

//phisics
let velocityX = -5;
let velocityY = 0;
let Gravity = 0.3;

let gameover = false;
let gameoverImg ;
let score =0;


window.onload = function (){
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;

    context = board.getContext("2d");
    //draw dino
    dinoImg = new Image ();
    dinoImg.src = "./img/dino.png";
    dinoImg.onload = function(){
        context.drawImage(dinoImg, dino.x , dino.y , dino.width , dino.height);
        document.addEventListener("keydown",moveDino);
    };
    cactus1Img =new Image();
    cactus1Img.src = "./img/cactus1.png";

    cactus2Img =new Image();
    cactus2Img.src = "./img/cactus2.png";

    cactus3Img =new Image();
    cactus3Img.src = "./img/cactus3.png";

    requestAnimationFrame(update);
    setInterval(placeCactus,1000);//1000 milliseconds ==1s
};

function update (){

    
    if(gameover)
    {
    
        return;
    }
    requestAnimationFrame(update);
    context.clearRect(0,0 , board.width , board.height);
    
    velocityY += Gravity;

    //dino
    dino.y = Math.min(dino.y + velocityY,dinoY);
    context.drawImage(dinoImg, dino.x , dino.y , dino.width , dino.height);
    
    //cactus
    for (let i=0; i< cactusArray.length;i++)
    {
        let cactus = cactusArray[i];
        cactus.x += velocityX;
        context.drawImage(cactus.img, cactus.x , cactus.y , cactus.width , cactus.height);

        if(detectCollision(dino, cactus))
        {
            gameover =true;

            dinoImg.src = "./img/dino-dead.png";
            dinoImg.onload = function(){
                context.drawImage(dinoImg, dino.x, dino.y, dino.width,dino.height);
            }
        }
    }
    //score
    context.fillStyle = "black";
    context.font = "20px courier";
    score++;
    context.fillText(score, 5,20);
}
function moveDino (e)
{
    if(gameover)
    {
        return;
    }
    if(e.code == "Space" || e.code == "ArrowUp" && dino.y == dinoY)
    {
        //jump
        velocityY = -10;

    }
}

function placeCactus (){
    
    if(gameover)
    {
        return;
    }

    let cactus = {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight
    };
    let placeCactusChance = Math.random();
    if(placeCactusChance>.90)
    {
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .70)
    {
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    }
    else if (placeCactusChance > .50)
    {
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }

    if (cactusArray.length > 5)
    {
        cactusArray.shift();
    }
}

function detectCollision(a,b){
    return a.x <b.x + b.width &&
           a.x + a.width > b.x && 
           a.y <b.y +b.height &&
           a.y + a.height > b.y;
}


