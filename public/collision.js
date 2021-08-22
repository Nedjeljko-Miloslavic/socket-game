function collisionDetection(){
	player1.fall = true;
	let movingStars = terrainArray.filter(terrain=>terrain.item=="star" && terrain.speedX!=0);
	
	
	terrainArray.forEach((terrain,index)=>{
		
		//--------------MOVING STARS-------------
		if(terrain.item=="star" && terrain.y>500){
			terrainArray.splice(index,1);
		}
		movingStars.forEach(star=>{
			if(terrain.item!="star" && star.x+17>terrain.x && star.x-17<terrain.x+30 && star.y+17>terrain.y && star.y-17<terrain.y+30){
				if(star.y+17>terrain.y+5 && star.y-17<terrain.y+30-5){
					if(star.x>terrain.x){
						star.x = terrain.x+30+17;
						star.speedX *=-1;
					}else{
						star.x = terrain.x-17;
						star.speedX *= -1;
					}
				}else{
					if(star.y<terrain.y){
						star.y = terrain.y-17;
						star.speedY = -5;
					}else{
						star.y = terrain.y+30+17;
						star.speedY = 5;
					}
				}
				
			}
		});
		
		
		
		//---------------BULLETS---------------
		bulletArray2.forEach((bullet,index)=>{
			if(bullet.x+bullet.size>terrain.x && bullet.x<terrain.x+terrain.size && bullet.y+bullet.size+bullet.speedY>terrain.y && bullet.y<terrain.y+9){
				bullet.speedY = -6;    //bullets
			}
			if(bullet.x+bullet.size>terrain.x && bullet.x<terrain.x+terrain.size && bullet.y>terrain.y && bullet.y<terrain.y+terrain.size){
				bulletArray2.splice(index,1);
			}
			if(bullet.y>500){
				bulletArray2.splice(index,1);
			}
			if(bullet.x+bullet.size>player1.x && bullet.x<player1.x+30 && bullet.y+bullet.size/2>player1.y && bullet.y<player1.y+90){
				if(player1.hittable){
					bulletArray2.splice(index,1); //bullet hit
					player1.hit = true;
					if(bullet.directionRight){
						player1.speed = 8;
					}else{
						player1.speed = -8;
					}
					socket.emit("playerHit",{index});
				}
			}
		});
		bulletArray1.forEach((bullet,index)=>{
			if(bullet.x+bullet.size>terrain.x && bullet.x<terrain.x+terrain.size && bullet.y+bullet.size+bullet.speedY>terrain.y && bullet.y<terrain.y+9){
				bullet.speedY = -6;    //bullets
			}
			if(bullet.x+bullet.size>terrain.x && bullet.x<terrain.x+terrain.size && bullet.y>terrain.y && bullet.y<terrain.y+terrain.size){
				bulletArray1.splice(index,1);
			}
			if(bullet.y>500){
				bulletArray1.splice(index,1);
			}
		});
		
		
		//----------------PLAYER TERRAIN INTERACTION----
		
		if(terrain.item!="star" && player1.x+30>terrain.x && player1.x<terrain.x+30 && player1.y+90+player1.speedY>=terrain.y && player1.y+90<terrain.y+5){
			player1.fall = false;
			player1.speedY = 1;
			player1.y = terrain.y-90;  //fall detection
			player1.jumpPossible = true;
		}
		if(player1.fall){
			player1.jumpPossible = false;
		}
		
		
		if(terrain.item!="star" && player1.x+30>terrain.x && player1.x<terrain.x+30 && player1.y+player1.speedY<=terrain.y+30 && player1.y>terrain.y+30-8){
			player1.speedY = 0;  //head hit detection
			if(terrain.font && !terrain.hit){
				terrain.hit = true;  //gun
				gunArray.push(new Gun(terrain.x+15,terrain.y-15)); //gun
				socket.emit("addGun", {index:index});
			}
		}
		
		
		if(terrain.item!="star" && player1.x+30>terrain.x && player1.x<terrain.x+30 && player1.y+90>terrain.y && player1.y<terrain.y+30){
			if(player1.x<terrain.x){
				player1.speed = 0;  //front hit
				player1.x=terrain.x-30;
				player1.moveRightPossible = false;
			}else{
				player1.speed = 0;
				player1.x=terrain.x+30;  //back hit
				player1.moveLeftPossible = false;
			}
		}else if(player1.hittable){
			player1.moveRightPossible = true;
			player1.moveLeftPossible = true;
		}
					//stars
		if(terrain.item=="star" && player1.hittable && player1.x+30>terrain.x-17 && player1.x<terrain.x+17 && player1.y+90>terrain.y-17 && player1.y<terrain.y+17){
			terrainArray.splice(index,1);
			player1.score ++;
			socket.emit("starRemove", {terrainMoved,index});
		}
	});
	
	
	//------------GUN Array
	gunArray.forEach((gun,index)=>{
		if(player1.x+30>gun.x && player1.x<gun.x+5 && player1.y+90>gun.y && player1.y<gun.y+5){
			gunArray.splice(index,1);
			player1.armed = true;
			socket.emit("removeGun", {index});
		}
		
	});
	
	
	
	//_----------------Player interactions
	if(player1.x+30>player2.x-terrainMoved && player1.x<player2.x+30-terrainMoved && player1.y+90>player2.y && player1.y<player2.y+90){
		player1.speed = 0;
		if(player1.y+84<player2.y &&player2.hittable){
			player2.hit = true;
			if(player1.x<player2.x-terrainMoved){
				player1.speed = -3;
				player1.speedY = -3;
				socket.emit("headHit", {speed:6});
			}else{
				player1.speed = 3;
				player1.speedY = -3;
				socket.emit("headHit", {speed:-6});
			}
		}else if(player1.x<player2.x-terrainMoved){
			player1.x = player2.x-30-terrainMoved;
		}else{
			player1.x = player2.x+30-terrainMoved;
		}
	}
	
	
	
	//PLAYER DEAD-----------------
	if(player1.y>500){
		player1.y = 260;
		player1.speed = 0;
		player1.life--;
		socket.emit("lifeReduction", {player1});
		if(player2.terrainMoved>600){
			player1.x = 100;
			terrainArray.forEach(terrain=>terrain.x+=terrainMoved);
			terrainMoved = 0;
		}else{
			player1.x = 600;
			terrainArray.forEach(terrain=>terrain.x+=terrainMoved);
			terrainMoved = environmentLength-canvas.width+50;
			terrainArray.forEach(terrain=>terrain.x-=terrainMoved);
		}
		player1.hit = true;
	}
}

		
	