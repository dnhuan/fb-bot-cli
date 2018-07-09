const fs = require("fs");
const readline = require("readline");
const login = require("facebook-chat-api");
//const func = require('./function.js');
var gapi;
var bot = {};

function main(api){
	gapi = api;
	gapi.listen((err,message)=>{
		if(err) throw err;
		console.log('\n');
		console.log(message);
		console.log('\n');
		//
		if(message.body.slice(0,4) == '!bot'){
				init(message.threadID);
				recv(message.body.slice(5).split(" "),message.threadID);
		}
		if(bot.hasOwnProperty(message.threadID)) botCopy(message.body,message.threadID,message.senderID);
	});
}

function init(id){
	if(!bot.hasOwnProperty(id)){
		bot[id] = {
			state: false,
			copy: false
		}
		gapi.sendMessage("Bot initialized",id);
	}
}

function recv(cmd,id){
	console.log(cmd[0]);
	if(cmd[0] == "delete"){
		delete bot[id];
		gapi.sendMessage("Bot deleted",id);
		return;
	}
	if(bot[id].state == false && cmd[0] != "start"){
		gapi.sendMessage("Bot has stopped",id);
		return;
	}
	switch(cmd[0]){
		case "start":
			if(bot[id].state == false){
				bot[id].state = true;
				gapi.sendMessage("Bot started",id);
			}
			else{
				gapi.sendMessage("Bot has started",id);
			}
			break;

		case "stop":
			if(bot[id].state == true){
				bot[id].state = false;
				bot[id].copy = false;
				gapi.sendMessage("Bot stopped",id);
			}
			else{
				gapi.sendMessage("Bot has stopped",id);
			}
			break;
		case "copy":
			switch(cmd[1]){
				case "on":
					bot[id].copy = true;
					gapi.sendMessage("Bot copying is on",id);
					break;
				case "off":
					bot[id].copy = false;
					gapi.sendMessage("Bot copying is off",id);
					break;
				default:
					gapi.sendMessage("Wrong syntax, please try again (Error 02)",id);
					break;
			}
			break;
		case "chửi":
			fs.readFile('./DO_NOT_TOUCH_badWords.txt', function(err, data){
    			if(err) throw err;
    			var insult = data.toString().split('\n');
			gapi.sendMessage(insult[Math.floor(Math.random()*insult.length)].replace_all("$name",cmd.join(" ").slice(5)),id);
			});
			break;
		case "nịnh":
			fs.readFile('./PLEASE_READ_warmHeartedWords.txt', function(err, data){
    			if(err) throw err;
    			var compliment = data.toString().split('\n');
			gapi.sendMessage(compliment[Math.floor(Math.random()*compliment.length)].replace_all("$name",cmd.join(" ").slice(5)),id);
			});
			break;
		case "":
			gapi.sendMessage("Hi!",id);
			break;
		default:
			gapi.sendMessage("Wrong syntax,please try again (Error 01)",id);
			break;

	}
}

function botCopy(msg,id,senderid){
	console.log(id);
	if(msg.slice(0,4) == "!bot" || senderid == gapi.getCurrentUserID()){
		return;
	}
	if(bot[id].copy == true){
		gapi.sendMessage(msg,id);
	}
}

String.prototype.replace_all = function(search,replace){
	var str = this;
	return str.split(search).join(replace);
};

module.exports = {
	main
}