var PLAY = 1;
var END = 0;
var gameState = PLAY;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameover, endImg;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);



//creating boy running
boy = createSprite(width/2,height-60,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
gameover = createSprite(width/2,height/2,10,10);
gameover.addImage(endImg);
gameover.scale = 0.5;   
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

//boy.debug = true;
boy.setCollider("circle",0,0,500);    
  
}

function draw() {

  background(0);
  
 
  
  
 if(gameState === PLAY){
       gameover.visible = false;
       path.velocityY = 4+(treasureCollection/60);
   
         //code to reset the background
       if(path.y > height ){
           path.y = height/2;
  } 
   
    boy.x = World.mouseX;
  
    edges= createEdgeSprites();
    boy.collide(edges);
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
   
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection+10;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+30;
    }
   else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
     treasureCollection = treasureCollection+20;
    }
   
     if(swordGroup.isTouching(boy)) {
       gameState = END;
       
     }
 }
  
 else if (gameState === END) {
         gameover.visible = true;
         path.velocityY = 0;
   
          if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
    }
    
       
    if (gameState === END) {
      cashG.destroyEach();
    }
     if (gameState === END) {
      diamondsG.destroyEach();
      
    }
    
     if(gameState === END) {
      jwelleryG.destroyEach();
      
    }
 }
  
   

    
    
     


  drawSprites();
  textSize(20);
  fill(rgb(255,0,0));
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3+(treasureCollection/60);
  cash.lifetime = height/2;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 100 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3+(treasureCollection/60);
  diamonds.lifetime = height/2;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3+(treasureCollection/60);
  jwellery.lifetime = height/2;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3+(treasureCollection/60);
  sword.lifetime = height/2;
  swordGroup.add(sword);
  }
}