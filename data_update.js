/**
 * Created by Yixin Xie on 2019/5/6
 **/

const express = require('express');                                                                                       //web framework
var app = express();
var fs = require('fs');                                                                                                 //read files
// var server = http.createServer(function (req,res){
//     fs.readFile('./index.html',function(error,data){
//         res.writeHead(200,{'Content-Type':'text/html'});
//         res.end(data,'utf-8');
//     });
// }).listen(3000,"127.0.0.1");
// console.log('Server running at http://127.0.0.1:3000/');

const EventEmitter = require('events');                                                                                 //Node's event emitter
const event = new EventEmitter();                                                                                       //三个事件，event为A1，event2为A2，event3为A3
const event2 = new EventEmitter();
const event3 = new EventEmitter();
const reviewEvent = new EventEmitter();
const ferret = new EventEmitter();
const clientCount  = {};

var sd = require("silly-datetime");                                                                                     //当前时间npm
var getPixels = require("get-pixels")                                                                                  //获取图片像素npm

const http = require('http').Server(app);
const io = require('socket.io').listen(http);

const mysql = require('mysql');                                                                                          //连接数据库
const connection = mysql.createConnection({
    host     : '192.168.28.30',
    user     : 'root',
    password : 'root',
    database : 'testdb',
    //table    : 'mask'
});
connection.connect();


var ModSql_1 = 'UPDATE mask SET A1 = ? WHERE channelID = ?';                                                            //定义MySQL语句
var ModSql_2 = 'UPDATE mask SET A2 = ? WHERE channelID = ?';
var ModSql_3 = 'UPDATE mask SET A3 = ? WHERE channelID = ?';

// var ModSql_x = 'UPDATE mask SET Size_X = ? WHERE channelID = ?';
// var ModSql_y = 'UPDATE mask SET Size_Y = ? WHERE channelID = ?';
var moment = 'UPDATE mask SET create_time = ? WHERE channelID = ?';

// var a,b,c;
// var pixel = new Array(a,b,c);
// var pixel=pixels.shape.slice();
// var img=new Image();
// img.onload=function(){console("img is loaded")};
// img.onerror=function(){console("error!")};
// img.src="roi_test.png";
// function show(){console("body is loaded");};
// window.onload=show;
//
// function getImgPixel(img, callback) {                                                                                //错误：像素的计算方法
//     var nWidth = img.naturalWidth
//     var nHeight = img.naturalHeight
//     return [nWidth, nHeight]
//     console.log('width:'+nWidth+',height:'+nHeight);
// }

app.get('/test_canvas.html', function(request, response){
    // res.sendFile(__dirname + '/test_canvas.html');
    // res.sendFile(__dirname + '/canvas_2.js');
    // res.sendFile(__dirname + '/roi_test.png');
    // fs.readFile(__dirname + '/roi_test.png');
    fs.readFile("./"+request.path.substr(1),function(err,data){
        // body
        if(err){
            console.log(err);
            //404：NOT FOUND
            response.writeHead(404,{"Content-Type":"text/html"});
        }
        else{
            //200：OK
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data.toString());
        }
        response.end();
    });
});

// app.use(express.static('./js_canvas'));

app.get('/roi_test.png', function(request, response){
    // res.sendFile(__dirname + '/test_canvas.html');
    // res.sendFile(__dirname + '/canvas_2.js');
    // res.sendFile(__dirname + '/roi_test.png');
    fs.readFile("./"+request.path.substr(1),function(err,data){
        // body
        if(err){
            console.log(err);
            //404：NOT FOUND
            response.writeHead(404,{"Content-Type":"text/html"});
        }
        else{
            //200：OK
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data.toString());
        }
        response.end();
    });
});

app.get('/canvas_2.js', function(request, response){
    // res.sendFile(__dirname + '/test_canvas.html');
    // res.sendFile(__dirname + '/canvas_2.js');
    // res.sendFile(__dirname + '/roi_test.png');
    // fs.readFile(__dirname + '/roi_test.png');
    fs.readFile("./"+request.path.substr(1),function(err,data){
        // body
        if(err){
            console.log(err);
            //404：NOT FOUND
            response.writeHead(404,{"Content-Type":"text/html"});
        }
        else{
            //200：OK
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data.toString());
        }
        response.end();
    });
});


io.sockets.on('connection', function(socket){                                                                                   //检查socket连接
    console.log('----------Socket-------------');
    console.log('user connected');
    socket.on('disconnect', function(){                                                                                 //socket失去连接
        console.log('disconnected');
    });
    socket.on('event', data => {                                                                                        //socket检测到event
        //console.log('event', data);
        event.emit('draw', {clientId: socket.id, data});
    });
    socket.on('event2', data2 =>{
        //console.log(data2);
        event2.emit('draw2', {clientId: socket.id, data2});
    });
    socket.on('event3', data3 =>{
        //console.log(data3);
        event3.emit('draw3', {clientId: socket.id, data3});
    });


});

http.listen(6060, function(){
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

    console.log('----------Start-------------');
    // getImgPixel(img, callback)
    console.log('listening on HTTP: 6060');
    console.log('listening start time:', time);
    getPixels("roi_test.png", function(err, pixels) {                                                         //获得图片像素，url为相对路径
        if(err) {
            console.log("Bad image path")
            return
        }
        console.log("pixels info:", pixels.shape.slice())
    })
    console.log('-----------------------------\n\n');

    io.on('connection', (socket) => {                                                                                   //server传给client端
        socket.on('reviewEvent', (name, fn) => {
            let CheSql_1 = 'SELECT A1 FROM mask where idMask = 1';                                              //MySQL语句：查询数据库
            let result;
            // let termA1 = result[0].A1;

            function sqlR(err, result, row) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                console.log('--------------------------Database----------------------------');
                console.log('result of MySql:\n', result);
                // var string = JSON.stringify(result);
                // console.log(string);
                // console.log('no. of num:', row.length);
                // console.log('row0:', row[0]);
                console.log('--------------------------------------------------------------\n\n');
                fn(result);                                                                                             //fn中的内容传值到client
            }
            connection.query(CheSql_1, sqlR);
        });

        socket.on('reviewEvent2', (name, fn) => {
            let CheSql_2 = 'SELECT A2 FROM mask where idMask = 1';                                              //MySQL语句：查询数据库
            function sqlR2(err, result2, row) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                console.log('--------------------------Database----------------------------');
                console.log('result of MySql:\n', result2);
                // console.log('no. of num:', row.length);
                console.log('--------------------------------------------------------------\n\n');
                fn(result2);                                                                                             //fn中的内容传值到client
            }
            connection.query(CheSql_2, sqlR2);
        });

        socket.on('reviewEvent3', (name, fn) => {
            let CheSql_3 = 'SELECT A3 FROM mask where idMask = 1';                                              //MySQL语句：查询数据库
            function sqlR3(err, result3, row) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                console.log('--------------------------Database----------------------------');
                console.log('result of MySql:\n', result3);
                // console.log('no. of num:', row.length);
                console.log('--------------------------------------------------------------\n\n');
                fn(result3);                                                                                             //fn中的内容传值到client

            }
            connection.query(CheSql_3, sqlR3);
        });





        // var a = connection.query(CheSql_1, sqlR);
        // console.log("test", a);

        // window.socket.emit('event', JSON.stringify(posi.slice(0, num)))
        // console.log('send msg A1', JSON.stringify(posi.slice(0, num)))

        // window.socket.emit('review', JSON.parse())





    });
});

event.on('draw', ({clientId, data})=>{                                                                                  //听取A1对应的事件event
    var t=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');                                                        //获取操作A1开始的时间
    if (clientCount.clientId) {
        clientCount.clientId += 1;
    } else {
        clientCount.clientId = 0;
    }

    console.log('Poly1 start time:', t)
    console.log('channelID:', clientCount.clientId)
    console.log('data inserted:', data)

    let tmp = JSON.parse(data);
    let imgDot = tmp.reduce(function(acc, value){
        return acc += value[0]+','+value[1]+ ';'                                                                        //存储格式0为x,1为y,末尾减一个字符
    }, '');
    imgDot = imgDot.slice(0, imgDot.length-1);

    const ModSql_Params_1 = [imgDot, clientCount.clientId]
    const moment_insert = [t,clientCount.clientId];                                                                     //插入当前时间

    // console.log(`
    //     ${imgDot.toString()}
    //     userModSql
    //     ${userModSql}
    //     userModSql_Params
    //     ${JSON.stringify(userModSql_Params)}
    //
    // `)

    connection.query(ModSql_1,ModSql_Params_1,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        console.log('---------------A1-------------');
        console.log('UPDATE affectedRows',result.affectedRows);
    });
    connection.query(moment,moment_insert,function (err, result) {                                                       //插入系统当前时间
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        console.log('-------------Time-------------');
        console.log('UPDATE affectedRows',result.affectedRows);
    });

    // getPixels("roi_test.png", function(err, pixels) {                                                          //获得图片像素
    //     if(err) {
    //         console.log("Bad image path")
    //         return
    //     }
    //     console.log("pixels info:", pixels.shape.slice())
    //
    //     var pixel_info=pixels.shape.slice();
    //         //console.log(pixel_info);
    //     var pixel = 'UPDATE mask SET size_X = ? , size_Y =? , A1 = ? WHERE idMask = ?';
    //     const pixel_Print = [pixel_info,'1'];                                                                 //需修改,idMask
    //
    //  })
})

event2.on('draw2', ({clientId, data2})=>{
    if (clientCount.clientId) {
        clientCount.clientId += 1;
    } else {
        clientCount.clientId = 0;
    }

    console.log('channelID:', clientCount.clientId)
    console.log('data inserted:', data2)

    let tmp2 = JSON.parse(data2);
    let imgDot2 = tmp2.reduce(function(acc, value){
        return acc += value[0]+','+value[1]+ ';'                                                                           //存储格式0为x,1为y,末尾减一个字符
    }, '');
    imgDot2 = imgDot2.slice(0, imgDot2.length-1);

    const ModSql_Params_2 = [imgDot2, clientCount.clientId]                                                          //需修改

    connection.query(ModSql_2,ModSql_Params_2,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        console.log('---------------A2-------------');
        console.log('UPDATE affectedRows',result.affectedRows);
    });
})

event3.on('draw3', ({clientId, data3})=>{
    if (clientCount.clientId) {
        clientCount.clientId += 1;
    } else {
        clientCount.clientId = 0;
    }

    console.log('channelID:', clientCount.clientId)
    console.log('data inserted:', data3)

    let tmp3 = JSON.parse(data3);
    let imgDot3 = tmp3.reduce(function(acc, value){
        return acc += value[0]+','+value[1]+ ';'                                                                           //存储格式0为x,1为y,末尾减一个字符
    }, '');
    imgDot3 = imgDot3.slice(0, imgDot3.length-1);

    const ModSql_Params_3 = [imgDot3, clientCount.clientId]                                                          //需修改

    connection.query(ModSql_3,ModSql_Params_3,function (err, result) {
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        console.log('---------------A3-------------');
        console.log('UPDATE affectedRows',result.affectedRows);
    });
})


// connection.end();