var		display = document.getElementById("display");
var		input = document.getElementById("input");
var		Status = document.getElementById("status");
var 	nickname = '';
var		nick = document.getElementById("nick");
var		send = document.getElementById("send");
var		host = location.origin;
const	client = io.connect(host);

while(nickname == null || nickname == '' || nickname.length > 14)
	nickname = prompt("Введите nickname:\n(не более 14-ти символов)");

nick.innerHTML = nickname;

function PrintMsg(message, flag)
{	
	/*var tmp = msg;
	
	if(flag) tmp = msg.data;
	
	var data = JSON.parse(tmp);
	var message = data.message;
	var index = -1;*/
	console.log(message);
	/*while((index = message.indexOf('\n', index + 1)) != -1 && index < message.length)
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
	if(message[0] == '\n') message = message.substring(1);*/
	if(message.length != 0) display.value += message + "\n\n";//"Сообщение от " + data.user + '\n' + message + "\n\n";
}

client.on("connect", () => Status.innerHTML = "Online");
client.on("disconnect", () => Status.innerHTML = "Offline");
client.on("msg", data => PrintMsg(data.message, true) );

send.addEventListener("click", e => {
	//e.preventDefault();
	
	if(input.value != '')
	{
		//var js = JSON.stringify({ message: input.value, user: nickname });
		
		client.emit("msg", { message: input.value });
		PrintMsg(input.value, false);
		input.value = '';
	}
});
