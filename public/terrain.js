class Terrain1{
	constructor(x,y){
		this.size = 30;
		this.x = x;
		this.y = y;
		this.movable = false;
		this.item = "terrain1";
	}
	update(){
		if(this.movable){
			this.x-=player1.speed;
		}
		ctx.fillStyle = "orange";
		ctx.beginPath();
		ctx.rect(this.x,this.y,this.size,this.size);
		ctx.fill();
		ctx.strokeStyle="red";
		ctx.stroke();
		ctx.fillStyle = "brown";
		ctx.beginPath();
		ctx.rect(this.x+this.size/4,this.y+this.size/4,this.size/7,this.size/7);
		ctx.fill();
		ctx.beginPath();
		ctx.rect(this.x+this.size*2.5/4,this.y+this.size/4,this.size/7,this.size/7);
		ctx.fill();
		ctx.beginPath();
		ctx.rect(this.x+this.size/4,this.y+this.size*3/4,this.size/7,this.size/7);
		ctx.fill();
		ctx.beginPath();
		ctx.rect(this.x+this.size*2.5/4,this.y+this.size*3/4,this.size/7,this.size/7);
		ctx.fill();
	}
}

class Terrain2{
	constructor(x,y){
		this.font = "20px Arial";
		this.x = x;
		this.y = y;
		this.size = 30;
		this.hit = false;
		this.item = "terrain2";
	}
	
	update(){
		if(this.movable){
			this.x-=player1.speed;
		}
		ctx.fillStyle = "brown";
		ctx.beginPath();
		ctx.rect(this.x,this.y,this.size,this.size);
		ctx.fill();
		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.font = this.font;
		if(!this.hit){
			ctx.fillText("G",this.x+10,this.y+25);
		}else{
			ctx.fillText("X",this.x+10,this.y+25);
		}
		
	}
}



let environment1 = [
	[1],
	[1],
	[1],
	[1],
	[1],
	[1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,2,1],
	[1],
	[1],
	[1],
	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
	[1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1]
];