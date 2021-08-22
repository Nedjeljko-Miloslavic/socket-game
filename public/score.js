class Score{
	constructor(player){
		this.player = player;
		this.y = 20;
		this.font = "17px Arial";
	}
	update(){
		if(this.player.playerNumber==1){
			ctx.beginPath();
			this.x = 70;
			ctx.font = this.font;
			ctx.fillStyle = "white";
			ctx.fillText("YOU", this.x,this.y);
			ctx.beginPath();
			ctx.fillText(`Lives: ${this.player.life}`, this.x,this.y+20);
			ctx.beginPath();
			ctx.fillText("Stars:", this.x,this.y+40);
			let stars1 = [];
			for(let i=0; i<this.player.score; i++){
				stars1.push(new Star(this.x+55+20*i,this.y+34,3));
			}
			starArray1 = stars1;
		}else{
			ctx.beginPath();
			this.x = canvas.width-200;
			ctx.font = this.font;
			ctx.fillStyle = "white";
			ctx.fillText("OPPONENT", this.x,this.y);
			ctx.beginPath();
			ctx.fillText(`Lives: ${this.player.life}`, this.x,this.y+20);
			ctx.beginPath();
			ctx.fillText("Stars:", this.x,this.y+40);
			let stars2 = [];
			for(let i=0; i<this.player.score; i++){
				stars2.push(new Star(this.x+55+20*i,this.y+34,3));
			}
			starArray2 = stars2;
		}
	}
}