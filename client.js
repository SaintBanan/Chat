var		display = document.getElementById("display");
var		input = document.getElementById("input");
var		Status = document.getElementById("status");
var 	nickname = '';
var		nick = document.getElementById("nick");
var		send = document.getElementById("send");
const	client = io.connect(location.origin);

//установка ширины и высоты приложения относительно разрешения экрана устройства

var width = (window.screen.width - 18);

if(width <= 480)
{
	var height = (window.screen.height - 100);
	var _form = document.getElementsByClassName("form");

	_form[0].style.width = width.toString() + "px";
	_form[0].style.height = height.toString() + "px";

	display.style.width = (width - 20).toString() + "px";
	display.style.height = (height - 80).toString() + "px";

	input.style.width = (width - 130).toString() + "px";
	send.style.width = ((width - 20) - (width - 110)).toString() + "px";
}

//установка...

while(nickname == null || nickname == '' || nickname.length > 14)
	nickname = prompt("Введите nickname:\n(не более 14-ти символов)");

nick.innerHTML = nickname;

function PrintMsg(msg)
{	
	var message = msg.message;
	
	message = DelElem(message, '\n');
	message = DelElem(message, ' ');
	
	if(message.length != 0) display.value += "Сообщение от " + msg.user + '\n' + message + "\n\n";
}

client.on("connect", () => Status.innerHTML = "Online");
client.on("disconnect", () => Status.innerHTML = "Offline");
client.on("msg", msg => PrintMsg(msg) );

send.addEventListener("click", e => {
	if(input.value != '')
	{
		var msg = { message: input.value, user: nickname };
		
		client.emit("msg", msg);
		PrintMsg(msg);
		input.value = '';
	}
});

function DelElem(message, elem)
{
	var index = -1;
	
	while((index = message.indexOf(elem, index + 1)) != -1)
	{
		var SecondIndex = index + 1;
		
		if(message[SecondIndex] == elem && SecondIndex < message.length)
		{
			while(message[SecondIndex] == elem) SecondIndex++;
			
			var tmp = message.substring(index, SecondIndex);
			
			message = message.replace(tmp, elem);
		}
		
		if(message[index - 1] == '\n' && index != 0)
		{
			var endStr = message.substring(index + 1);
			var startStr = message.substring(0, index);
			message = startStr.concat(endStr);
		}
	}
	
	if(message[message.length - 1] == elem) message = message.substring(0, message.length - 1);
	if(message[0] == elem) message = message.substring(1);
	
	message = message.trim();
	
	return message;
}
