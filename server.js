const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").createServer(app);


const io = require("socket.io")(server);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");

server.listen(3000, ()=>console.log("listening"));

let player1Chosen = "no";
let player2Chosen = "no";

app.get("/", (req,res)=>{
	res.render("index",{player1Chosen,player2Chosen});
});
app.post("/one", (req,res)=>{
	player1Chosen = req.body.playerChosen;
});
app.post("/two", (req,res)=>{
	player2Chosen = req.body.playerChosen;
});

io.on("connection", (socket)=>{
	socket.on("disconnect", ()=>{
		player1Chosen = "no";
		player2Chosen = "no";
	})
	socket.on("update", (payload)=>{
		socket.broadcast.emit("update", payload);
	});
	socket.on("chosePlayer", (payload)=>{
		io.emit("chosePlayer", payload);
	});
	socket.on("addGun", (payload)=>{
		socket.broadcast.emit("addGun", payload);
	});
	socket.on("removeGun", (payload)=>{
		socket.broadcast.emit("removeGun", payload);
	});
	socket.on("directionChange", (payload)=>{
		socket.broadcast.emit("directionChange", payload);
	});
	socket.on("addBullet", (payload)=>{
		socket.broadcast.emit("addBullet", payload);
	});
	socket.on("playerHit", (payload)=>{
		socket.broadcast.emit("playerHit", payload);
	});
	socket.on("headHit", (payload)=>{
		socket.broadcast.emit("headHit", payload);
	});
	socket.on("starRemove", (payload)=>{
		socket.broadcast.emit("starRemove", payload);
	});
	socket.on("starAdd", (payload)=>{
		socket.broadcast.emit("starAdd", payload);
	});
	socket.on("lifeReduction", (payload)=>{
		socket.broadcast.emit("lifeReduction", payload);
	});
})