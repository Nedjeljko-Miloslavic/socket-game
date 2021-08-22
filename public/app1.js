const canvas = document.querySelector("#canvas1");
const pickPlayer1 = document.querySelector(".pickPlayer");
const pickPlayer2 = document.querySelectorAll(".pickPlayer")[1];
const begin = document.querySelector("#begin");
const lose = document.querySelector("#lose");
const playAgain = document.querySelectorAll(".playAgain");
const win = document.querySelector("#win");
let player1 = null;
let player2 = null;
let circle1;
let circle2;
let score1 = new Score(player1);
let score2 = new Score(player2);
canvas.height = 460;
canvas.width = window.innerWidth;
let keydown = undefined;
let keyup = false;
let coordinates = {};
const socket = io();

const ctx = canvas.getContext("2d");


pickPlayer1.addEventListener("click", (e)=>{
	if(e.target.classList.length==1){
		coordinates = {
			player1:{
				x:200,
				y:270
			},
			player2:{
				x:500,
				y:270
			}
		}
		begin.style.display = "none";
		socket.emit("chosePlayer", 1);
		
		player1 = new Player(coordinates.player1.x,coordinates.player1.y,30,90,"green",1);
		player2 = new Player(coordinates.player2.x,coordinates.player2.y,30,90,"red",2);
		score1 = new Score(player1);
		score2 = new Score(player2);
		circle1 = new Circle(50+(canvas.width-100)*(player1.x+terrainMoved)/environmentLength,425,"green");
		circle2 = new Circle(50+(canvas.width-100)*(player2.x)/environmentLength,425,"red");
		starAppear();
		
		fetch("http://localhost:3000/one", {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				playerChosen:"yes"
			})
		});
	}
	
	
});

pickPlayer2.addEventListener("click", (e)=>{
	if(e.target.classList.length==1){
		coordinates = {
			player2:{
				x:200,
				y:270
			},
			player1:{
				x:500,
				y:270
			}
		}
		begin.style.display = "none";
		socket.emit("chosePlayer", 2);
		
		player1 = new Player(coordinates.player1.x,coordinates.player1.y,30,90,"green",1);
		player2 = new Player(coordinates.player2.x,coordinates.player2.y,30,90,"red",2);
		score1 = new Score(player1);
		score2 = new Score(player2);
		circle1 = new Circle(50+(canvas.width-100)*(player1.x+terrainMoved)/environmentLength,425,"green");
		circle2 = new Circle(50+(canvas.width-100)*(player2.x)/environmentLength,425,"red");
		
		
		fetch("http://localhost:3000/two", {
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				playerChosen:"yes"
			})
		});
	}
	
});

socket.on("chosePlayer", (payload)=>{
	
	if(payload==1){
		const pickPlayer1New = pickPlayer1.cloneNode(true);
		pickPlayer1.parentNode.replaceChild(pickPlayer1New,pickPlayer1);
		pickPlayer1New.style.background = "rgb(200,200,200)";
		pickPlayer1New.classList.add("nohover");
	}else if(payload==2){
		const pickPlayer2New = pickPlayer2.cloneNode(true);
		pickPlayer2.parentNode.replaceChild(pickPlayer2New,pickPlayer2);
		pickPlayer2New.style.background = "rgb(200,200,200)";
		pickPlayer2New.classList.add("nohover");
	}
});




playAgain.forEach(play=>{
	play.addEventListener("click", ()=>{
		location.reload();
	});
});