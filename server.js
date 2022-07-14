const express = require('express');
const favicon = require('express-favicon');
const path = require('path');

const https = require('https')
const fs = require('fs')
const http = require('http')

const options = {
	cert: fs.readFileSync('/etc/nginx/ssl/nginx.crt'),
	key: fs.readFileSync('/etc/nginx/ssl/nginx.key')
}

const { PORT=8000, LOCAL_ADDRESS='0.0.0.0' } = process.env

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));

//здесь наше приложение отдаёт статику
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

//обслуживание html
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//app.listen(PORT, LOCAL_ADDRESS);
https.createServer(options, app).listen(8443, "0.0.0.0", function(){
	console.log("https start")
})
http.createServer(app).listen(8000, "0.0.0.0", function(){
	console.log("http start")
})
