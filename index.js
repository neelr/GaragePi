var express = require("express");
var bodyparse = require("body-parser")
var ejs = require("ejs");
var Gpio = require('onoff').Gpio
var app = express();
app.set('view engine', 'ejs');
app.use(bodyparse.urlencoded({ extended: true }));

var door = new Gpio(4, 'out');
// setup the stuff for gpio
function open() {
	door.writeSync(1);
}
function close() {
	door.writeSync(0);
console.log(door.readSync());
}
function activate() {
	open()
	console.log(door.readSync());
	setTimeout(close,5000)
}
app.get("/",(req,res)=> {
	res.render("index");
});
app.post("/door",(req,res)=> {
	console.log(req.body);
	if (req.body.auth == process.env.KEY) {
		res.sendStatus(200)
		activate();
	} else {
		res.sendStatus(401)
	}
});

app.listen(3000,()=> {
	console.log("On port 3000");
})
