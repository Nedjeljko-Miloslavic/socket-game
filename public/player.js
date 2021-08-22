class Player{
	constructor(x,y,width,height, color, playerNumber){
		this.originalCoordinateX = this.x;
		this.playerNumber = playerNumber;
		this.speed = 0;
		this.score = 0;
		this.life = 3;
		this.speedY = 0;
		this.gravity = 0.5;
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;
		this.color = color;
		this.originalColor = color;
		this.moveLeftPossible = true;
		this.moveRightPossible = true;
		this.jumpPossible = true;
		this.fall = false;
		this.movable = true;
		this.terrainMoved = 0;
		this.armed = false;
		this.directionRight = true;
		this.hit = false;
		this.hittable = true;
	}
	
	draw(x,y){
		ctx.beginPath();
		ctx.rect(x,y,this.width,this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		if(this.armed){
			ctx.beginPath();
			ctx.fillStyle = "yellow";
			if(this.directionRight){
				ctx.arc(x+30,y+20,8,0,2*Math.PI);
				ctx.fill();
				ctx.beginPath();
				ctx.fillStyle = "red";
				ctx.arc(x+34,y+20,4,0,2*Math.PI);
				ctx.fill();
			}else{
				ctx.arc(x-4,y+20,8,0,2*Math.PI);
				ctx.fill();
				ctx.beginPath();
				ctx.fillStyle = "red";
				ctx.arc(x-8,y+20,4,0,2*Math.PI);
				ctx.fill();
			}
		}
	}
	
	hitDetection(){
		
		if(this.hit){
			if(this.score>0){
				this.score--;
			}
			this.moveLeftPossible = false;
			this.moveRightPossible = false;
			setTimeout(()=>{
				this.moveLeftPossible = true;
				this.moveRightPossible = true;
			},1000);
			this.hit = false;
			this.hittable = false;
			this.armed = false;
			let blink = setInterval(()=>{
				if(this.color == this.originalColor){
					this.color = "rgba(100,100,100,0.3)";
				}else{
					this.color = this.originalColor;
				}
			},300);
			setTimeout(()=>{
				clearInterval(blink);
				this.hittable = true;
				this.color = this.originalColor;
			},3000);
		}
		
	}
	
	update(){
		
		if(this.movable){
			this.x += this.speed;
		}
		
		this.y += this.speedY;
		
		if(keydown=="left" && this.moveLeftPossible){
			if(this.directionRight){
				socket.emit("directionChange", {directionRight:false});
			}
			this.directionRight = false;
			
			if(this.speed>=-5){
				this.speed-=0.4;
			}
		}else if(keydown=="right" && this.moveRightPossible){
			if(!this.directionRight){
				socket.emit("directionChange", {directionRight:true});
			}
			this.directionRight = true;
			if(this.speed<=5){
				this.speed+=0.4;
			}
		}else if(!keydown){
			if(this.speed>0){
				this.speed-=0.1;
			}
			if(this.speed<0){
				this.speed+=0.1;
			}
			if(Math.abs(this.speed)<0.1){
				this.speed =0;
			}
		}
		if(this.fall){
			if(this.speedY>=0 && this.speedY<1){
				this.speedY = 1;
			}
			if(this.speedY<8){
				this.speedY+=this.gravity;
			}
		}
	}
}