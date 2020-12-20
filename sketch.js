var dog, database, foodStock, dogImage, happyDogImage, foodObject, foodS;

function preload(){
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(200, 200, 20, 20);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  feed = createButton("Feed the dog");
  feed.position(450, 50);
  feed.mousePressed(feedDog);
  addFood = createButton("Add Food");
  addFood.position(550, 50);
  addFood.mousePressed(addFoods);
  foodObject = new Food();
  
}


function draw() {  
  background(46,139,87);
  drawSprites();
  fill("#ff177c");
  stroke("#50d4e6");
  textSize(15);
  text("Food stock:" +foodS, 20, 400);
  foodObject.display();
}
function readStock(data){
 foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  } else{
    x = x-1
  }
  database.ref("/").update({
    Food: x
  })
}

function feedDog(){
  dog.addImage(happyDogImage);
  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref("/").update({
    Food: foodObject.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}