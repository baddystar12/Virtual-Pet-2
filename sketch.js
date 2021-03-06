var dog, database, foodStock, dogImage, happyDogImage, foodObj, foodS, lastFed;

function preload(){
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  dog = createSprite(800, 200, 20, 20);
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
  foodObj = new Food();
}


function draw() {  
  background(46,139,87);
  drawSprites();
  fill("#ff177c");
  stroke("#50d4e6");
  textSize(15);
  text("Food stock:" +foodS, 20, 400);
  foodObj.display();
  feedTime = database.ref("lastFed");
  feedTime.on("value", function(data){
    lastFed = data.val();
  })
textSize(15);
fill("#3107ad");
  if(lastFed>12){
  text("Last Fed:"+ lastFed%12+ "PM", 350, 30);
}
else if(lastFed = 0){
  text("Last Fed: 12 AM", 350, 30);
}
else {
  text("Last Fed:"+lastFed + "AM", 350, 30);
}
}
function readStock(data){
 foodS = data.val();
 foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogImage);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}

/*function garden(){ 
  
}
function bathroom(){

}
function sleeping(){

}*/
