class Gun{
	constructor(x,y){
		this.xStart = x;
		this.yStart = y;
		this.size = 5;
		this.radius = 5;
		this.angle =0;
		this.movable = false;
		this.x = this.xStart;
		this.y = this.yStart;
	}
	
	update(){
		if(this.movable){
			this.xStart-=player1.speed;
		}
		this.x = this.xStart + Math.cos(this.angle)*this.radius;
		this.y = this.yStart + Math.sin(this.angle)*this.radius;
		this.angle += 0.2;
		ctx.strokeStyle = "yellow";
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(this.x+4,this.y,this.size/2,0,2*Math.PI);
		ctx.fillStyle = "red";
		ctx.fill();
	}
}