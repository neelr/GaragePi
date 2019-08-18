var Gpio = require('onoff').Gpio;
var door = new Gpio(4, 'out');

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

activate();
