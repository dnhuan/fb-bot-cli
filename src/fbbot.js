const fs = require("fs");
const readline = require("readline");
const login = require("facebook-chat-api");
const controller = require('./controller.js');

var lop = 1557985100941201;
var gapi;
var account = {
	email: NaN,
	password:NaN
};

var account = {
	email:"johnnywalkerqwerty@gmail.com",
	password:"phoTe@m"
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

login({appState: JSON.parse(fs.readFileSync('../appstate.json', 'utf8'))}, (err,api) =>{
// login(account, (err,api) =>{	
		if(err){
			switch(err.error){
				case 'login-approval':
					console.log('Enter code: ');
					rl.on('line', (line)=>{
						err.continue(line);
						rl.close();
					});
					break;
				default:
					console.error(err);
			}
			return;
		}
		api.setOptions({
			forceLogin: true,
			selfListen: true
		});
		// fs.writeFileSync('../appstate.json', JSON.stringify(api.getAppState()));
		controller.main(api);
	}
)
