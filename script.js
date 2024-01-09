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
    };
    requestAnimationFrame(update);
};

function update (){
    requestAnimationFrame(update);
    context.drawImage(dinoImg, dino.x , dino.y , dino.width , dino.height);

}

