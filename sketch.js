// GameStates, to manage controls
var PLAY = 1;
var END = 0;
var gameState = PLAY;
// Variable for Score
var score;
// Playable Character
var katana, katanaImage;
// Chosen targets
var fruit, fruit1Image,fruit2Image,fruit3Image,fruit4Image;
var fruit1, fruit1group;
// Negative sprite
var enemy, enemyImage;
var enemy1, enemy1Group, enemy1Image
// spawner and groups for targets
var rand, fruitsGroup, enemyGroup;
//Image for katana to turn into once Game Over
var gameOver, gameOverImage;
var gameOverSound, katanaSound;
var playAgainButton, playAgainImage;

function preload(){

// Inserting Images and Animations
  
  katanaImage = loadImage("sword.png");
  katanaSound = loadSound("knifeSwooshSound.mp3");
  
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  
  playAgainImage = loadImage("playAgain.png")
  
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  
  enemyImage = loadAnimation("alien1.png", "alien2.png");
  enemy1Image = loadAnimation("alien1.png", "alien2")
}

function setup(){

// Creating playable Character
  katana = createSprite(40, 200, 20,20);
  katana.addImage ("katana", katanaImage);
  katana.scale = 0.7;
  katana.setCollider ("circle", 3, 5, 50)
  
  gameOver = createSprite(200, 150, 20, 20);
  gameOver.addImage ("gameOver", gameOverImage);
  gameOver.visible = 0;
  gameOver.scale = 1.5
  
  playAgainButton = createSprite(200, 300, 20, 20);
  playAgainButton.addImage ("button", playAgainImage);
  playAgainButton.scale = 0.5;
//  playAgainButton = setCollider = ("rectangle", 0, 0, 5, 100)
  playAgainButton.visible = 0;
  
// Favourable Target's Group
//  fruit = createSprite(350, 350, 20, 20);
  fruitsGroup =  new Group();
  fruit1Group = new Group();

// Negative Target's Group
//  enemy = createSprite(200, 200, 20, 20);
//  enemy.addImage (enemyImage);
  enemyGroup = new Group();
  enemy1Group = new Group();
  
  score = 0;
}

function draw(){
  background (200);
  
// Stating what should be able to be used only inside each of the GameStates   
  if (gameState === PLAY){

// Katana follows mouse in both ways
    katana.x = mouseX;
    katana.y = mouseY;
    katana.changeImage ("katana");
    
// Function to spawn the targets
    fruits();
    enemies();

// What will happen when the katana is touching the fruits
    if (katana.isTouching(fruitsGroup)){

      score = score + 2;
      katanaSound.play();
      fruit.destroy();

    }
    
    if (katana.isTouching(fruit1Group)){
      score = score + 3;
      katanaSound.play();
      fruit1.destroy();
    }

// Declaring how gameState END will come into action
    if (katana.isTouching(enemyGroup)){
      enemy.destroy();
      gameState = END
      gameOverSound.play();
    }
    
    if (katana.isTouching(enemy1Group)){
      enemy1.destroy();
      gameState = END
      gameOverSound.play();
    }
  }

// what should be possible while gamState END
  if (gameState === END){
    gameOver.visible = 1;
    playAgainButton.visible = 1;

    if (frameCount%75 == 0){

      
      if (katana.isTouching(playAgainButton)) {
      
      katanaSound.play();
      score = 0
      gameState = PLAY;
      playAgainButton.visible = 0;
      gameOver.visible = 0;
      
      }  
    }
// Katana follows mouse in both ways
    katana.x = mouseX;
    katana.y = mouseY;    
    
 

// Making sure that no obstacle moves at all
    enemyGroup.destroyEach();
    enemyGroup.setVelocityXEach (0);
    fruitsGroup.destroyEach();
    fruitsGroup.setVelocityXEach (0);
    enemy1Group.destroyEach();
    enemy1Group.setVelocityXEach (0);
    fruit1Group.destroyEach();
    fruit1Group.setVelocityXEach (0);
    
  }
  
  drawSprites();

// Positioning ScoreBoard
  text ("Score: " + score, 325, 25);
}

// Creating the fruits to slash at regular intervals 80 frms
function fruits(){
  
  if (frameCount%40 === 0){
    
    fruit = createSprite(400, 400, 20, 20);
    fruit.scale = 0.2;

    
// Picking the looks of the fruit  
    var rand = Math.round(random(1,4));
    
    if (rand == 1){
      fruit.addImage(fruit1Image);
    } else if (rand == 2){
      fruit.addImage(fruit2Image);
    } else if (rand == 3){
      fruit.addImage(fruit3Image);
    } else if (rand == 4){
      fruit.addImage(fruit4Image);
    }
    
// Y position of spawn
    fruit.y = Math.round(random(50, 340));
    fruit.velocityX = -14
// Preventing Memory Leakage
    fruit.setLifetime = 100;
// Adding the fruits to their relative group
    fruitsGroup.add(fruit);
  } 
  
  if (score >= 4){
    if (frameCount >= 200){
      if (frameCount%40 === 0){

        fruit1 = createSprite(0, 400, 20, 20);
        fruit1.scale = 0.2;


    // Picking the looks of the fruit  
        var rand = Math.round(random(1,4));

        if (rand == 1){
          fruit1.addImage(fruit1Image);
        } else if (rand == 2){
          fruit1.addImage(fruit2Image);
        } else if (rand == 3){
          fruit1.addImage(fruit3Image);
        } else if (rand == 4){
          fruit1.addImage(fruit4Image);
        }

    // Y position of spawn
        fruit1.y = Math.round(random(50, 340));
        fruit1.velocityX = 14
    // Preventing Memory Leakage
        fruit1.setLifetime = 100;
    // Adding the fruits to their relative group
        fruit1Group.add(fruit1);
      }
    }
  }
}

// Creating negative targets every 200 frames
function enemies(){
  
  if (frameCount%82 === 0){

// Making and animating the negative targets
    enemy = createSprite(400, 400, 20, 20);
    enemy.scale = 1;
    enemy.addAnimation("moving", enemyImage);
//enemy.debug = true;

// Randomizing negative target's Y Axis Spawn
    enemy.y = Math.round(random(100, 300));
// Speed
    enemy.velocityX = -10;
// How many frames it will last
    enemy.setLifetime = 50;
// Adding the negative Sprites to their group
    enemyGroup.add(enemy);
    
  }
  
  if (score >= 10){
    
    if (frameCount%82 === 0){

  // Making and animating the negative targets
      enemy1 = createSprite(0, 400, 20, 20);
      enemy1.scale = 1;
      enemy1.addAnimation("moving", enemyImage);
  //enemy.debug = true;

  // Randomizing negative target's Y Axis Spawn
      enemy1.y = Math.round(random(100, 300));
  // Speed
      enemy1.velocityX = 10;
  // How many frames it will last
      enemy.setLifetime = 50;
  // Adding the negative Sprites to their group
      enemy1Group.add(enemy1);
    }
  }  
}