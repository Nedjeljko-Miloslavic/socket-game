class Bullet{
	constructor(x,y,direction){
		this.x = x;
		this.y = y;
		this.directionRight = direction;
		this.speedX = 6;
		this.speedY = 0;
		this.gravity = 0.8;
		this.size = 4;
	}
	update(){
		if(this.speedY<6){
			this.speedY+=this.gravity;
		}
		if(this.directionRight){
			this.x += this.speedX;
		}else{
			this.x-= this.speedX;
		}
		this.y += this.speedY;
		
		ctx.fillStyle = "blue";
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
		ctx.fill();
	}
}