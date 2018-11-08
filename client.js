var		display = document.getElementById("display");
var		input = document.getElementById("input");
var		Status = document.getElementById("status");
var 	nickname = null;
var		nick = document.getElementById("nick");
const	send = document.getElementById("send");
var		port = process.env.PORT || 3000;
const	client = new WebSocket("ws://192.168.1.8:3000");

while(nickname == null || nickname == '' || nickname.length > 14)
	nickname = prompt("Введите nickname:\n(не более 14-ти символов)");

nick.innerHTML = nickname;

function PrintMsg(msg)
{
	var i = 0;
	
	while(msg[i] != '!') i++;
	
	var user = msg.substring(0, i);
	
	msg = msg.substring(i + 1);	
	
	display.value += "Сообщение от " + user + '\n' + msg + "\n\n";
}

client.onopen = () => Status.innerHTML = "Online";
client.onclose = () => Status.innerHTML = "Offline";
client.onmessage = msg => PrintMsg(msg.data);

send.addEventListener("click", e => {
	if(input.value != '')
	{
		var user = nickname + '!';
		var msg = user.concat(input.value);
		
		client.send(msg);
		PrintMsg(msg);
		input.value = '';
	}
});
