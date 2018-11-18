var		display = document.getElementById("display");
var		input = document.getElementById("input");
var		Status = document.getElementById("status");
var 	nickname = '';
var		nick = document.getElementById("nick");
var		send = document.getElementById("send");
var		host = location.origin.replace("http", "ws");
const	client = new WebSocket("host" + ":8080");

while(nickname == null || nickname == '' || nickname.length > 14)
	nickname = prompt("Введите nickname:\n(не более 14-ти символов)");

nick.innerHTML = nickname;

function PrintMsg(msg, flag)
{	
	var tmp = msg;
	
	if(flag) tmp = msg.data;
	
	var data = JSON.parse(tmp);
	var message = data.message;
	var index = -1;
	
	while((index = message.indexOf('\n', index + 1)) != -1 && index < message.length)
	{
		var SecondIndex = index + 1;
		
		if(message[SecondIndex] == '\n' && SecondIndex < message.length)
		{
			while(message[SecondIndex] == '\n') SecondIndex++;
			
			var tmp = message.substring(index, SecondIndex);
			
			message = message.replace(tmp, '\n');
		}
	}
	
	if(message[message.length - 1] == '\n') message = message.substring(0, message.length - 1);
	if(message[0] == '\n') message = message.substring(1);
	if(message.length != 0) display.value += "Сообщение от " + data.user + '\n' + message + "\n\n";
}

client.onopen = () => Status.innerHTML = "Online";
client.onclose = () => Status.innerHTML = "Offline";
client.onmessage = msg => PrintMsg(msg, true);

send.addEventListener("click", e => {
	//e.preventDefault();
	
	if(input.value != '')
	{
		var js = JSON.stringify({ message: input.value, user: nickname });
		
		client.send(js);
		PrintMsg(js, false);
		input.value = '';
	}
});
