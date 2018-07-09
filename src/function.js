const controller = require("./controller.js");
const gapi = controller.gapi;
const bot = controller.bot;

function mainCMD(){
	
}

function copy(msg,id){
	console.log(id);
	if(bot[id].copy == true){
		gapi.sendMessage(msg,id);
	}
}

module.exports = {
	mainCMD,
	copy
}
