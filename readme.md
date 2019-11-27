## intro

### 1. [前端]加入 signalr 前端套件

```shell
npm i @microsoft/signalr --save
```

如果打算用`<script></script>`載入 signalr 的方式，記得需要手動將`node_modules/@microsoft/signalr/dist/browser/signalr.js`複製到`/wwwroot/lib/signalr/`目錄內

> 其餘使用方法及注意事項請直接參考 NPM 網站說明:[@microsoft/signalr](https://www.npmjs.com/package/@microsoft/signalr)

### 2. [前端]於頁面載入 signalr.js

於頁面加入標籤引用 js 檔案

```html
<script src="lib/signalr/signalr.min.js"></script>
```

### 3. [後端]準備 Hub

.net Core 3 不需要額外安裝 nuget 套件，可直接`using Microsoft.AspNetCore.SignalR;`  
新增一個類別，繼承 Hub，即可開始撰寫 SignalR 的 Hub，範例如下

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Art.NetCore.SignalR.Hub
{
    public class ChatHub :Microsoft.AspNetCore.SignalR.Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}

```

### 4. [後端]準備注入服務

```csharp
// Startup.cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddSignalR();
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapHub<ChatHub>("/chatHub");
    });
}

```

### 5. [前端]呼叫 SignalR

```javascript
// 建立SignalR連接
var connection = new signalR.HubConnectionBuilder().withUrl('/chatHub').build();
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
```

## ref

1. [Homura Lin - [鐵人賽 Day3] 第一個 SingalR 專案](https://homura0731.github.io/post/ironman2019/ironman-day-03/)

