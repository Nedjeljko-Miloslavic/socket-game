class Line{
	constructor(xStart,yStart,xEnd,yEnd){
		this.xStart = xStart;
		this.yStart = yStart;
		this.xEnd = xEnd;
		this.yEnd = yEnd;
	}
	
	update(){
		ctx.beginPath();
		ctx.rect(this.xStart,this.yStart,this.xEnd,this.yEnd);
		ctx.fillStyle = "rgba(200,200,200,0.8)";
		ctx.fill();
	}
}

class Circle{
	constructor(x,y,color){
		this.x = x;
		this.y = y;
		this.color = color;
	}
	
	update(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,10,0,2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}