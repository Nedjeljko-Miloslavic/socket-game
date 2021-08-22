let gameOn = true;

function animate(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	line.update();
	if(gameOn){
		requestAnimationFrame(animate);
	}
	
	if(player1 && player2){
		if(player1.score>5 || player2.life<1){
			win.style.display = "block";
			console.log(win);
			gameOn = false;
			canvas.style.display = "none";
		}else if(player1.life<1 || player2.score>5){
			lose.style.display = "block";
			console.log(lose);
			gameOn = false;
			canvas.style.display = "none";
		}
		circle1.update();
		circle2.update();
		updateCircle();
		player1.hitDetection();
		player2.hitDetection();
		if(terrainArray[3].movable){
			terrainMoved+=player1.speed;
			player1.terrainMoved = terrainMoved;
			
		}
		movableEnvironment();
		player1.update();
		collisionDetection();
		player1.draw(player1.x,player1.y);
		player2.draw(player2.x-terrainMoved,player2.y);
		if(player1.speedY!=0 || player1.speed!=0){
			socket.emit("update", {x:player1.x,y:player1.y,terrainMoved});
		}
		
		socket.off("update").on("update", (payload)=>{
			player2.x=payload.x +payload.terrainMoved;
			player2.y=payload.y;
			player2.terrainMoved = payload.terrainMoved;
		});
		socket.off("addGun").on("addGun", (payload)=>{
			const terrain = terrainArray[payload.index];
			if(!terrain.hit){
				gunArray.push(new Gun(terrain.x+15,terrain.y-15));
			}
			terrain.hit = true;
		});
		socket.off("removeGun").on("removeGun", (payload)=>{
			gunArray.splice(payload.index,1);
			player2.armed = true;
		});
		socket.off("directionChange").on("directionChange", (payload)=>{
			player2.directionRight = payload.directionRight;
		});
		socket.off("addBullet").on("addBullet", (payload)=>{
			bulletArray2.push(new Bullet(payload.x-terrainMoved,payload.y,payload.directionRight));
		});
		socket.off("playerHit").on("playerHit", (payload)=>{
			player2.hit = true;
			bulletArray1.splice(payload.index,1);
			if(player2.score>0){
				let randomNum = 0;
				if(Math.random()*10>5){
					randomNum = 1;
				}else{
					randomNum = -1;
				}
				let newStar = new Star(player2.x,player2.y-20,7,randomNum*3,-4,0.25);
				terrainArray.push(newStar);
				socket.emit("starAdd", {terrainMoved,newStar});
			}
		});
		socket.off("headHit").on("headHit", (payload)=>{
			player1.hit = true;
			player1.speed = payload.speed;
			if(player1.score>0){
				let newStar = new Star(player1.x,player1.y-20,7,3,-4,0.25);
				if(player1.x<player2.x-terrainMoved){
					newStar.x -=20;
					newStar.speedX *=-1;
				}else{
					newStar.x += 20;
				}
				
				terrainArray.push(newStar);
				socket.emit("starAdd", {terrainMoved,newStar});
			}
		});
		socket.off("starRemove").on("starRemove", (payload)=>{
			terrainArray.splice(payload.index,1);
			player2.score++;
		});
		socket.off("starAdd").on("starAdd", (payload)=>{
			terrainArray.push(new Star(payload.newStar.x+payload.terrainMoved-terrainMoved,payload.newStar.y,7,payload.newStar.speedX,payload.newStar.speedY,payload.newStar.gravity));
		});
		socket.off("lifeReduction").on("lifeReduction", (payload)=>{
			player2.life--;
			if(player2.score>0){
				player2.score--;
			}
			
		});
		
		
		
		if(score1 && score2){
			score1.update();
			score2.update();
		}
	}
	
	
	
	bulletArray = bulletArray1.concat(bulletArray2);
	gunArray.forEach(gun=>gun.update());
	terrainArray.forEach(terrain=>terrain.update());
	bulletArray.forEach(bullet=>bullet.update());
	starArray1.forEach(star=>star.update());
	starArray2.forEach(star=>star.update());
}

animate();