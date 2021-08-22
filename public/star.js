class Star{
	constructor(x,y,size, speedX=0,speedY=0,gravity=0){
		this.item = "star";
		this.x = x;
		this.y = y;
		this.speedX = speedX;
		this.speedY = speedY;
		this.gravity = gravity;
		this.size = size;
		this.distance = size/2;
		this.color = "gold";
		this.movable = false;
		setInterval(()=>{
			if(this.color=="gold"){
				this.color="rgba(150,190,20,0.5)";
			}else{
				this.color = "gold";
			}
		},1000);
	}
	
	update(){
		this.x += this.speedX;
		this.y += this.speedY;
		if(this.movable){
			this.x-=player1.speed;
		}
		if(this.speedX!=0){
			if(this.speedY<5){
				this.speedY+=this.gravity;
			}
		}
		ctx.beginPath();
		ctx.strokeStyle = "yellow";
		ctx.save();
		ctx.translate(this.x,this.y);
		ctx.moveTo(0,0);
		
		ctx.moveTo(this.size+this.distance,this.size+this.distance);
		ctx.lineTo(this.distance,this.distance);
		
		
		for(let i=0; i<6; i++){
			ctx.lineTo(this.size+this.distance,this.size+this.distance);
			
			ctx.lineTo(this.distance,this.distance);
			ctx.rotate(Math.PI/3);
		}
		
		
		
		ctx.restore();
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.stroke();
		
	}
}