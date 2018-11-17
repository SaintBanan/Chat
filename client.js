var	display = document.getElementById("display");
var	input = document.getElementById("input");
var	send = document.getElementById("send");
var	client = new WebSocket("ws://localhost:3000");

function PrintMsg(msg)
{	
	var data = JSON.parse(msg.data);

	display.value += data.message + "\n\n";
}

client.onopen = () => alert("online");
client.onclose = () => alert("offline");
client.onmessage = msg => PrintMsg(msg);

send.addEventListener("click", e => {
	if(input.value != '')
	{
		var js = JSON.stringify({ message: input.value});
		
		client.send(js);
		input.value = '';
	}
});
