//引入express模块
var express = require('express');
//创建一个app对象，类似一个web 应用（网站）
var app = express();
//接受指定路径的请求，指定回调函数
app.get('/', function (req, res){
res.send('Hello World');
});
//创建一个web服务器，可以认为就是web服务器对象
//监听8081端口，当监听成功时回调
var server = app.listen(8081, function () {
   var host = server.address().address;  //地址
   var port = server.address().port;  //端口
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
}); 