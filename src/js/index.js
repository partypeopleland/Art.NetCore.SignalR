const signalR = require('@microsoft/signalr');

// 建立SignalR連接
let connection = new signalR.HubConnectionBuilder().withUrl('/chatHub').build();

// 傳送訊息事件
connection.on('ReceiveMessage', (user, message) => appendMessage(`${user}:${message}`));

// 連接事件
connection.start().catch(err => console.error(err.toString()));

// Button事件
document.getElementById('submitBtn').addEventListener('click', function(event) {
	var user = document.getElementById('name').value;
	var message = document.getElementById('msg').value;
	connection.invoke('SendMessage', user, message).catch(err => console.error(err.toString()));
	event.preventDefault();
});

// 在UI上添加訊息
function appendMessage(content) {
	var li = document.createElement('li');
	li.textContent = content;
	document.getElementById('msgDiv').appendChild(li);
}
