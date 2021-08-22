//player1 = new Player(200,270,30,90,"green",1); //remove this
//player2 = new Player(400,270,30,90,"red",2); //remove this


//score1 = new Score(player1); //remove this
//score2 = new Score(player2); //remove this


let terrainMoved = 0;
const environmentLength = environment1[environment1.length-1].length*30;

const line = new Line(50,420,canvas.width-100,10);

//circle1 = new Circle(50+(canvas.width-100)*(player1.x+terrainMoved)/environmentLength,425,"green");
//circle2 = new Circle(50+(canvas.width-100)*(player2.x)/environmentLength,425,"red");	



function updateCircle(){
	circle1.x = 50+(canvas.width-100)*(player1.x+terrainMoved)/environmentLength;
	circle2.x = 50+(canvas.width-100)*(player2.x)/environmentLength;
}

const terrainArray = [];
const gunArray = [];
const bulletArray1 = [];
const bulletArray2 = [];
let bulletArray = [];
let starArray1 = [];
let starArray2 = [];

const star = new Star(1900,200,7);
terrainArray.push(star);
terrainArray.push(new Star(100,200,7));



function starAppear(){
	setInterval(()=>{
		let allStars = terrainArray.filter(terrain=>terrain.item=="star");
		let randomNum = Math.ceil(Math.random()*3);
		let newStar;
		if(randomNum==1 && !allStars.find(star=>star.x==100)){
			newStar = new Star(100-terrainMoved,200,7);
		}else if(randomNum==2 && !allStars.find(star=>star.x==200)){
			newStar = new Star(1000-terrainMoved,200,7);
		}else if(randomNum==3 && !allStars.find(star=>star.x==300)){
			newStar = new Star(1900-terrainMoved,200,7);
		}
		
		if(allStars.length<2 && newStar && !allStars.find(star=>star.x<=newStar.x+5 && star.x>=newStar.x-5)){
			terrainArray.push(newStar);
			socket.emit("starAdd", {terrainMoved,newStar});
		}		
	},15000);
	
}


function movableEnvironment(){													
	if(player1.x>=canvas.width/2 && player1.speed>0 && terrainMoved<environmentLength-canvas.width+50){
		player1.movable = false;
		gunArray.forEach(gun=>gun.movable=true);
		bulletArray.forEach(bullet=>{
			if(bullet.directionRight){
				bullet.speedX = 6-player1.speed;
			}else if(!bullet.directionRight){
				bullet.speedX = 6+player1.speed;
			}
		});
		terrainArray.forEach(terrain=>terrain.movable=true);
	}else if(player1.x<=canvas.width/2 && player1.speed<0 && terrainMoved>0){
		player1.movable = false;
		gunArray.forEach(gun=>gun.movable=true);
		terrainArray.forEach(terrain=>terrain.movable=true);
		bulletArray.forEach(bullet=>{
			if(bullet.directionRight){
				bullet.speedX = 6-player1.speed;
			}else if(!bullet.directionRight){
				bullet.speedX = 6+player1.speed;
			}
		});
	}else{
		player1.movable = true;
		gunArray.forEach(gun=>gun.movable=false);
		terrainArray.forEach(terrain=>terrain.movable=false);
	}
	if(terrainMoved>=environmentLength-canvas.width+50 || terrainMoved<=0){
		bulletArray.forEach(bullet=>{
			bullet.speedX = 6;
		});
		//console.log(player1.x, canvas.width/2);
	}
}




environment1.forEach((terrain,terrainIndex)=>{
	terrain.forEach((box,boxIndex)=>{
		if(box==1){
			terrainArray.push(new Terrain1(boxIndex*30, terrainIndex*30));
		}else if(box==2){
			terrainArray.push(new Terrain2(boxIndex*30, terrainIndex*30));
		}		
	});
});
for(let i=0, positionY=0; i<environment1.length; i++){
	positionY += 30;
	terrainArray.push(new Terrain1(environmentLength,positionY));
}



window.addEventListener("keydown", (e)=>{
	if(e.key=="a"){
		keydown="left";
		player1.moveRightPossible = true;
	}else if(e.key=="d"){
		keydown="right";
		player1.moveLeftPossible = true;
	}else if(e.key=="w" && player1.jumpPossible){
		player1.speedY = -8;
		keyup = true;
		player1.gravity = 0.2;
		setTimeout(()=>{
			if(!keyup){
				player1.gravity=0.5;
			}
		},150);
		setTimeout(()=>{
			player1.gravity = 0.5;
		},450);
		player1.jumpPossible = false;
	}
	
	if(e.key=="p" && player1.armed && bulletArray1.length<3){
		if(player1.directionRight){
			bulletArray1.push(new Bullet(player1.x+34,player1.y+20,true));
			socket.emit("addBullet",{x:player1.x+34+terrainMoved,y:player1.y+20,directionRight:true});
		}else{
			bulletArray1.push(new Bullet(player1.x-4,player1.y+20,false));
			socket.emit("addBullet",{x:player1.x-4+terrainMoved,y:player1.y+20,directionRight:false});
		}
		
	}
	
});

window.addEventListener("keyup", (e)=>{
	if(e.key=="d" || e.key=="a"){
		keydown=null;
	}
	if(e.key=="w"){
		keyup = false;
	}
});
