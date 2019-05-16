/**
 * Created by Yixin Xie on 2019/4/30
 **/

//var begin = false;
var posi_num = 0;
var posi = new Array()                                                                                                  //定义位置数组A1,第一个图形
for(var i = 0; i<=20 ; i++) {
    posi[i] = new Array(0,0);
    //console.log(i);
    //console.log(posi[i]);
}

var posi2_num = 0;
var posi2 = new Array()                                                                                                 //定义位置数组A2
for(var i = 0; i<=20 ; i++) {
    posi2[i] = new Array(0, 0);
    //console.log(i);
    //console.log(posi2[i])
}

var posi3_num = 0;
var posi3 = new Array()                                                                                                 //定义位置数组A3
for(var i = 0; i<=20 ; i++) {
    posi3[i] = new Array(0, 0);
    //console.log(i);
    //console.log(posi3[i])
}

window.onload = function load() {
    coon();                                                                                                             //监听通道开启
    var ctx, mouseX, mouseY;
    var screen = document.getElementById("myCanvas")                                                          //获取画布
    var btn1 = document.getElementById("btn1")
    var btn2 = document.getElementById("btn2")
    var btn3 = document.getElementById("btn3")
    var clean = document.getElementById("clean")
    var review = document.getElementById("review")

    // var test = document.getElementById("test")

    review.onclick =  function review() {                                                                               //review点击,查看数据库已有数据，并划出区域
        console.log ('Review btn is clicked');
        window.socket = io('http://localhost:6060');
        socket.emit('reviewEvent', 'tobi', (data) => {                                                                  //连接server
                console.log('hearing from sever...A1...');
            let arrayDot = data[0].A1.split(';');                                                                       //按；分离得到一组一组的坐标
                console.log('arrayDot:', arrayDot);
            let num = arrayDot.length;
                console.log('No.of Dot:',num);
            let beginDot = arrayDot[0].split(',');                                                             //起始坐标
            let beginDotX = beginDot[0];
            let beginDotY = beginDot[1];
                console.log('begin-X:', beginDotX);
                console.log('begin-Y:', beginDotY);
            let missedDot = arrayDot[1].split(',');                                                             //起始坐标
            let missedDotX = missedDot[0];
            let missedDotY = missedDot[1];
                // console.log('2ndDot-MissingDot-X:', missedDotX);
                // console.log('2ndDot-MissingDot-Y:', missedDotY);
                // console.log('array max num:', num-1);
            let endArray = arrayDot[num-1];                                                                             //终点坐标,非闭合点。实际是array[num-2]不是array[num-1]
                // console.log('endArray:', endArray);
            let endDot = endArray.split(',');
            let endDotX = endDot[0];
            let endDotY = endDot[1];
                console.log('end-X:', endDotX);
                console.log('end-Y:', endDotY);
            var arrX=[];
            arrX.push(beginDotX);
                // console.log('arrX', arrX);
            var arrY=[];
            arrY.push(beginDotY);
                // console.log('arrY', arrY);

            for (i=1; i<=num-2; i++) {
                // console.log(i, 'Dot location:', arrayDot[i]);
                // console.log(i, 'LastDot Location:', arrayDot[i - 1]);
                // console.log(i, 'NextDot Location:', arrayDot[i+1]);
                let array = arrayDot[i];
                // console.log('array', array);
                let arrayLast = arrayDot[i-1];
                // console.log('arrayLast:', arrayLast);
                let arrayNext = arrayDot[i+1];
                // console.log('arrayNext:', arrayNext);
                let singleDot = array.split(',');                                                        //按，分离得到xy坐标
                let LastDot = arrayLast.split(',');
                let NextDot = arrayNext.split(',');
                let singleDotX = singleDot[0];
                let singleDotY = singleDot[1];
                    console.log(i, 'X:', singleDotX);
                    console.log(i, 'Y:', singleDotY);
                let LastDotX = LastDot[0];
                let LastDotY = LastDot[1];
                    console.log(i, 'LastX:', LastDotX);
                    console.log(i, 'LastY:', LastDotY);
                let NextDotX = NextDot[0];
                let NextDotY = NextDot[1];
                    console.log(i, 'NextX:', NextDotX);
                    console.log(i, 'NextY:', NextDotY);
                drawReview(LastDotX, LastDotY, singleDotX, singleDotY, NextDotX, NextDotY);
                // console.log('checking:', LastDotX, LastDotY, singleDotX, singleDotY);
                arrX.push(singleDotX);
                arrY.push(singleDotY);
            }
            // console.log('arrX', arrX);
            arrX.push(endDotX);
            arrY.push(endDotY);
                console.log('arrX', arrX);
                console.log('arrY', arrY);
            drawMissed(beginDotX, beginDotY, endDotX, endDotY,missedDotX, missedDotY);
            drawMissedend(beginDotX, beginDotY, endDotX, endDotY, missedDotX, missedDotY);
            fillDots(num, arrX, arrY);
        })
        socket.emit('reviewEvent2', 'tobi', (data2) => {                                                                  //连接server
            console.log('hearing from sever...A2...');
             // console.log(data2);
             // console.log(data2[0].A2);
            let arrayDot = data2[0].A2.split(';');                                                                       //按；分离得到一组一组的坐标
            console.log('arrayDot:', arrayDot);
            let num = arrayDot.length;
            console.log('No.of Dot:',num);
            let beginDot = arrayDot[0].split(',');                                                             //起始坐标
            let beginDotX = beginDot[0];
            let beginDotY = beginDot[1];
            console.log('begin-X:', beginDotX);
            console.log('begin-Y:', beginDotY);
            let missedDot = arrayDot[1].split(',');                                                             //起始坐标
            let missedDotX = missedDot[0];
            let missedDotY = missedDot[1];
            // console.log('2ndDot-MissingDot-X:', missedDotX);
            // console.log('2ndDot-MissingDot-Y:', missedDotY);
            // console.log('array max num:', num-1);
            let endArray = arrayDot[num-1];                                                                             //终点坐标,非闭合点。实际是array[num-2]不是array[num-1]
            // console.log('endArray:', endArray);
            let endDot = endArray.split(',');
            let endDotX = endDot[0];
            let endDotY = endDot[1];
            console.log('end-X:', endDotX);
            console.log('end-Y:', endDotY);
            var arrX=[];
            arrX.push(beginDotX);
            // console.log('arrX', arrX);
            var arrY=[];
            arrY.push(beginDotY);
            // console.log('arrY', arrY);
            for (i=1; i<=num-2; i++) {
                // console.log(i, 'Dot location:', arrayDot[i]);
                // console.log(i, 'LastDot Location:', arrayDot[i - 1]);
                // console.log(i, 'NextDot Location:', arrayDot[i + 1]);
                let array = arrayDot[i];
                // console.log('array', array);
                let arrayLast = arrayDot[i-1];
                // console.log('arrayLast:', arrayLast);
                let arrayNext = arrayDot[i+1];
                // console.log('arrayNext:', arrayNext);
                let singleDot = array.split(',');                                                        //按，分离得到xy坐标
                let LastDot = arrayLast.split(',');
                let NextDot = arrayNext.split(',');
                let singleDotX = singleDot[0];
                let singleDotY = singleDot[1];
                console.log(i, 'X:', singleDotX);
                console.log(i, 'Y:', singleDotY);
                let LastDotX = LastDot[0];
                let LastDotY = LastDot[1];
                console.log(i, 'LastX:', LastDotX);
                console.log(i, 'LastY:', LastDotY);
                let NextDotX = NextDot[0];
                let NextDotY = NextDot[1];
                console.log(i, 'NextX:', NextDotX);
                console.log(i, 'NextY:', NextDotY);
                drawReview(LastDotX, LastDotY, singleDotX, singleDotY, NextDotX, NextDotY);
                arrX.push(singleDotX);
                arrY.push(singleDotY);
            }
            arrX.push(endDotX);
            arrY.push(endDotY);
            drawMissed(beginDotX, beginDotY, endDotX, endDotY,missedDotX, missedDotY);
            drawMissedend(beginDotX, beginDotY, endDotX, endDotY, missedDotX, missedDotY);
            fillDots(num, arrX, arrY);
        });
        socket.emit('reviewEvent3', 'tobi', (data3) => {                                                                  //连接server
            console.log('hearing from sever...A3...');
            // console.log(data3);
            let arrayDot = data3[0].A3.split(';');                                                                       //按；分离得到一组一组的坐标
            console.log('arrayDot:', arrayDot);
            let num = arrayDot.length;
            console.log('No.of Dot:',num);
            let beginDot = arrayDot[0].split(',');                                                             //起始坐标
            let beginDotX = beginDot[0];
            let beginDotY = beginDot[1];
            console.log('begin-X:', beginDotX);
            console.log('begin-Y:', beginDotY);
            let missedDot = arrayDot[1].split(',');                                                             //起始坐标
            let missedDotX = missedDot[0];
            let missedDotY = missedDot[1];
            // console.log('2ndDot-MissingDot-X:', missedDotX);
            // console.log('2ndDot-MissingDot-Y:', missedDotY);
            // console.log('array max num:', num-1);
            let endArray = arrayDot[num-1];                                                                             //终点坐标,非闭合点。实际是array[num-2]不是array[num-1]
            // console.log('endArray:', endArray);
            let endDot = endArray.split(',');
            let endDotX = endDot[0];
            let endDotY = endDot[1];
            console.log('end-X:', endDotX);
            console.log('end-Y:', endDotY);
            var arrX=[];
            arrX.push(beginDotX);
            // console.log('arrX', arrX);
            var arrY=[];
            arrY.push(beginDotY);
            // console.log('arrY', arrY);
            for (i=1; i<=num-2; i++) {
                console.log(i, 'Dot location:', arrayDot[i]);
                console.log(i, 'LastDot Location:', arrayDot[i - 1]);
                console.log(i, 'NextDot Location:', arrayDot[i+1]);
                let array = arrayDot[i];
                // console.log('array', array);
                let arrayLast = arrayDot[i-1];
                // console.log('arrayLast:', arrayLast);
                let arrayNext = arrayDot[i+1];
                // console.log('arrayNext:', arrayNext);
                let singleDot = array.split(',');                                                        //按，分离得到xy坐标
                let LastDot = arrayLast.split(',');
                let NextDot = arrayNext.split(',');
                let singleDotX = singleDot[0];
                let singleDotY = singleDot[1];
                console.log(i, 'X:', singleDotX);
                console.log(i, 'Y:', singleDotY);
                let LastDotX = LastDot[0];
                let LastDotY = LastDot[1];
                console.log(i, 'LastX:', LastDotX);
                console.log(i, 'LastY:', LastDotY);
                let NextDotX = NextDot[0];
                let NextDotY = NextDot[1];
                console.log(i, 'NextX:', NextDotX);
                console.log(i, 'NextY:', NextDotY);
                drawReview(LastDotX, LastDotY, singleDotX, singleDotY, NextDotX, NextDotY);
                arrX.push(singleDotX);
                arrY.push(singleDotY);
            }
            arrX.push(endDotX);
            arrY.push(endDotY);
            drawMissed(beginDotX, beginDotY, endDotX, endDotY,missedDotX, missedDotY);
            drawMissedend(beginDotX, beginDotY, endDotX, endDotY, missedDotX, missedDotY);
            fillDots(num, arrX, arrY);
        });
    }

    btn1.onclick = function btn1() {                                                                                    //点击按钮1，开始第1个绘图
        console.log('btn1 is clicked')
        screen.onclick = function (event) {
            mouseX = getMousePos(1, event);                                                                       //获取当前鼠标点击的横纵位置
            mouseY = getMousePos(2, event);
            posi[posi_num][0] = mouseX;                                                                                 //将点击的位置存入数组中
            posi[posi_num][1] = mouseY;
            console.log("X:" + mouseX + "\t Y:" + mouseY + "\t num:" + posi_num);
            drawLine1(posi_num);
            posi_num++;

            // test.onclick =  function test (){                                                                        //无按钮画图试验失败。原目的：在屏幕加载时，不点击按钮即开始画图，submit后画出第二个图形。
            //     console.log('test button is clicked');
            //     drawLine2(posi2_num);
            //     posi2_num++;
            // }
        }
    }

    btn2.onclick = function btn2() {                                                                                    //点击按钮2，开始第2个绘图
        console.log('btn2 is clicked')
        screen.onclick = function (event) {
            mouseX = getMousePos(1, event);
            mouseY = getMousePos(2, event);
            posi2[posi2_num][0] = mouseX;
            posi2[posi2_num][1] = mouseY;
            console.log("X:" + mouseX + "\t Y:" + mouseY + "\t num:" + posi2_num);
            drawLine2(posi2_num);
            posi2_num++;
        }
    }

    btn3.onclick = function btn3() {                                                                                    //点击按钮3，开始第3个绘图
        console.log('btn3 is clicked')
        screen.onclick = function (event) {
            mouseX = getMousePos(1, event);
            mouseY = getMousePos(2, event);
            posi3[posi3_num][0] = mouseX;
            posi3[posi3_num][1] = mouseY;
            console.log("X:" + mouseX + "\t Y:" + mouseY + "\t num:" + posi3_num);
            drawLine3(posi3_num);
            posi3_num++;
        }
    }

    clean.onclick = function clean() {                                                                                  //清空画布：包括图像内所有图形
        console.log('clean btn is clicked');
        var c=document.getElementById("myCanvas");
        c.height=c.height;                                                                                      //开启新画布：清空之前的poly

        // posi.splice(0, posi.length);

        posi = new Array()                                                                                                  //定义位置数组A1,第一个图形
        for(var i = 0; i<=20 ; i++) {
            posi[i] = new Array(0,0);}
        console.log('posi',JSON.stringify(posi.slice(0, num)));

        submit.onclick = function submiterror() {                                                               //清空后提交，显示Warning
            console.log('Warning: submit error, canvas has been cleaned')
        }
    }
}

function coon() {                                                                                                       //socket conf
    // const socket = io({transports: ['websocket']});                                                                  //websocket transport only
    window.socket = io.connect('http://localhost:6060');
    socket.on('connect', function() {
        console.log('socket connect:', socket.connected);
        socket.emit('news', {my: 'data'});
    });
    socket.on('event', function(){
    });
    // socket.on('review', 'tobi', (data) => {
    //     console.log('review connected');
    //     console.log(data);
    // });
}

function getMousePos(num,event) {
    var e = event || window.event;                                                                                      //获取位置信息，加入屏幕滚动
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //console.log('x: ' + x + '\n y: ' + y);
        // return { 'x': x, 'y': y };
    // if(num == 1)   return e.clientX;                                                                                 //e.clientX 不考虑屏幕滚动
    // else return e.clientY;
    if (num == 1) return x; else return y;
}

function drawLine1(num) {
    var canvas = document.getElementById("myCanvas");
    var ctx;
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.lineJoin = "round";

        if (num == 0) {                                                                                                 //起点
            console.log('1st dot of A1 created, keep drawing A1');
        }
        else {
            ctx.moveTo(posi[num][0], posi[num][1]);                                                                     //创建path起点
            ctx.lineTo(posi[num - 1][0], posi[num - 1][1]);                                                             //lineto指向path终点
            //console.log('x: ' + posi[num][0] + '\n y: ' + posi[num][1]);
            ctx.closePath();                                                                                            //创建当前点和上一个点连接形成的path
            ctx.stroke();                                                                                               //画线：涂满路径

            submit.onclick = function submit (){                                                                            //按钮4:提交poly1
                console.log ('submit btn is clicked')
                if (num > 20){                                                                                          //判断超出20个点
                    console.log('Warning：too many dots created, limited 20');
                }
                else if (num >1 && posi[num][0] >= posi[0][0] - 50 && posi[num][0] <= posi[0][0] + 50 && posi[num][1] >= posi[0][1] - 50 && posi[num][1] <= posi[0][1] + 50) {
                    window.socket.emit('event', JSON.stringify(posi.slice(0, num)))                                         //插入数据
                    console.log('send msg A1', JSON.stringify(posi.slice(0, num)))                                             //判断最后一个点和第一个点重合：第一个点周围x,y误差为50px

                    // socket.on('review',function(msg){
                    //     console.log(msg);//msg是服务器端发送的数据
                    // })

                    ctx.fillStyle = "rgba(102,205,170,0.6)";
                    ctx.beginPath();                                                                                    //填充选中区域,%为透明度
                    ctx.moveTo(posi[0][0], posi[0][1]);
                    for (var i = 0; i < num; i++) {
                        ctx.lineTo(posi[i][0], posi[i][1]);
                    }
                    ctx.closePath();
                    ctx.fill();
                }                                                                                                       //此处必须判断num>1，不是起始点，否则出现两条数据插入
                else {
                console.log('Warning: not yet a poly, keep drawing A1, connect to the 1st dot of A1');                  //判断不为封闭图形，否则不提交至数据库
                }
            }

            // console.log('posi',JSON.stringify(posi.slice(0, num)));
            // clean.onclick = function clean() {                                                                                  //清空画布：包括图像内所有图形
            //     console.log('clean btn is clicked');
            //     var c=document.getElementById("myCanvas");
            //     c.height=c.height;                                                                                      //开启新画布：清空之前的poly
            //
            //     // posi.splice(0, posi.length);
            //
            //     posi = new Array()                                                                                                  //定义位置数组A1,第一个图形
            //     for(var i = 0; i<=50 ; i++) {
            //         posi[i] = new Array(0,0);}
            //     console.log('posi',JSON.stringify(posi.slice(0, num)));
            //
            //     submit.onclick = function submiterror() {                                                               //清空后提交，显示Warning
            //         console.log('Warning: submit error, canvas has been cleaned')
            //     }
            // }
        }
    }
}

function drawLine2(num) {
    var canvas = document.getElementById("myCanvas");
    var ctx;
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 5;
        ctx.lineJoin = "round";
        if (num == 0) {
            console.log('1st dot of A2 created, keep drawing A2');
        }
        else {
            ctx.moveTo(posi2[num][0], posi2[num][1]);
            ctx.lineTo(posi2[num - 1][0], posi2[num - 1][1]);
            //console.log('x: ' + posi[num][0] + '\n y: ' + posi[num][1]);
            ctx.closePath();
            ctx.stroke();

            submit.onclick = function submit (){
                console.log ('submit btn is clicked')
                if (num > 20){
                    console.log('Warning：too many dots created, limited 20');
                }
                else if (num >1 && posi2[num][0] >= posi2[0][0] - 50 && posi2[num][0] <= posi2[0][0] + 50 && posi2[num][1] >= posi2[0][1] - 50 && posi2[num][1] <= posi2[0][1] + 50) {
                    window.socket.emit('event2', JSON.stringify(posi2.slice(0, num)))
                    console.log('send msg A2', JSON.stringify(posi2.slice(0, num)))

                    ctx.fillStyle = "rgba(102,205,170,0.6)";
                    ctx.beginPath();                                                                                    //填充选中区域
                    ctx.moveTo(posi2[0][0], posi2[0][1]);
                    for (var i = 0; i < num; i++) {
                        ctx.lineTo(posi2[i][0], posi2[i][1]);
                    }
                    ctx.closePath();
                    ctx.fill();
                }
                else {
                    console.log('Warning: not yet a poly, keep drawing A2, connect to the 1st dot of A2');
                }
            }
            // clean.onclick = function clean() {                                                                                  //清空画布：包括图像内所有图形
            //     console.log('clean btn is clicked');
            //     var c=document.getElementById("myCanvas");
            //     c.height=c.height;                                                                                      //开启新画布：清空之前的poly
            //
            //     // posi2.splice(0, posi2.length);
            //
            //     posi = new Array()                                                                                                  //定义位置数组A1,第一个图形
            //     for(var i = 0; i<=50 ; i++) {
            //         posi2[i] = new Array(0,0);}
            //     console.log('posi2',JSON.stringify(posi2.slice(0, num)));
            //
            //     submit.onclick = function submiterror() {                                                               //清空后提交，显示Warning
            //         console.log('Warning: submit error, canvas has been cleaned')
            //     }
            // }
        }
    }
}

function drawLine3(num) {
    var canvas = document.getElementById("myCanvas");
    var ctx;
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 5;
        ctx.lineJoin = "round";
        if (num == 0) {
            console.log('1st dot of A3 created, keep drawing A3');
        }
        else {
            ctx.moveTo(posi3[num][0], posi3[num][1]);
            ctx.lineTo(posi3[num - 1][0], posi3[num - 1][1]);
            //console.log('x: ' + posi[num][0] + '\n y: ' + posi[num][1]);
            ctx.closePath();
            ctx.stroke();
            submit.onclick = function submit (){
                console.log ('submit btn is clicked')
                if (num > 20){
                    console.log('Warning：too many dots created, limited 20');
                }
                else if (num >1 && posi3[num][0] >= posi3[0][0] - 50 && posi3[num][0] <= posi3[0][0] + 50 && posi3[num][1] >= posi3[0][1] - 50 && posi3[num][1] <= posi3[0][1] + 50) {
                    window.socket.emit('event3', JSON.stringify(posi3.slice(0, num)))
                    console.log('send msg A3', JSON.stringify(posi3.slice(0, num)))

                    ctx.fillStyle = "rgba(102,205,170,0.6)";
                    ctx.beginPath();                                                                                    //填充选中区域
                    ctx.moveTo(posi3[0][0], posi3[0][1]);
                    for (var i = 0; i < num; i++) {
                        ctx.lineTo(posi3[i][0], posi3[i][1]);
                    }
                    ctx.closePath();
                    ctx.fill();
                }
                else {
                    console.log('Warning: not yet a poly, keep drawing A3, connect to the 1st dot of A3');
                }
            }
            // clean.onclick = function clean() {                                                                                  //清空画布：包括图像内所有图形
            //     console.log('clean btn is clicked');
            //     var c=document.getElementById("myCanvas");
            //     c.height=c.height;                                                                                      //开启新画布：清空之前的poly
            //
            //     // posi3.splice(0, posi3.length);
            //
            //     posi3 = new Array()                                                                                                  //定义位置数组A1,第一个图形
            //     for(var i = 0; i<=50 ; i++) {
            //         posi3[i] = new Array(0,0);}
            //     console.log('posi3',JSON.stringify(posi3.slice(0, num)));
            //
            //     submit.onclick = function submiterror() {                                                               //清空后提交，显示Warning
            //         console.log('Warning: submit error, canvas has been cleaned')
            //     }
            // }
        }
    }
}

function drawReview(beginDotX, beginDotY, LastDotX, LastDotY, singleDotX, singleDotY, NextDotX, NextDotY, endDotX, endDotY){
    console.log('drawReview Running...')
    var canvas = document.getElementById("myCanvas");
    var ctx;
    // console.log('currentdotx', singleDotX, 'currentdoty', singleDotY);
    // console.log('lastdotx', LastDotX, 'lastdoty', LastDotY);
    // console.log('nextdotx', NextDotX, 'nextdoty', NextDotY);
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "purple";
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.moveTo(singleDotX, singleDotY);
    ctx.lineTo(LastDotX, LastDotY);
    ctx.closePath();                                                                                                //创建当前点和上一个点连接形成的path
    ctx.stroke();                                                                                                  //画线：涂满路径
    // ctx.beginPath();                                                                                             //填充选中区域,%为透明度
    // ctx.moveTo(beginDotX, beginDotY);
    // for (var i = 0; i <num; i++) {
    //     ctx.lineTo(singleDotX, singleDotY);
    // }
    // ctx.closePath();
    // ctx.fill();
}

function drawMissed(beginDotX, beginDotY, endDotX, endDotY, missedDotX, missedDotY){
    console.log('drawMissed Running...')
    // console.log(endDotX, endDotY)
    var canvas = document.getElementById("myCanvas");
    var ctx;
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "purple";
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";

    console.log(endDotX, endDotY, beginDotX, beginDotY, missedDotX, missedDotY);
    ctx.moveTo(missedDotX, missedDotY);
    ctx.lineTo(beginDotX, beginDotY);
    // ctx.lineTo(endDotX, endDotY);
    ctx.closePath();                                                                                                //创建当前点和上一个点连接形成的path
    ctx.stroke();                                                                                                   //画线：涂满路径
}

function drawMissedend(beginDotX, beginDotY, endDotX, endDotY, missedDotX, missedDotY){
    console.log('drawMissedEnd Running...')
    // console.log(endDotX, endDotY)
    var canvas = document.getElementById("myCanvas");
    var ctx;
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "purple";
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";

    console.log(endDotX, endDotY, beginDotX, beginDotY, missedDotX, missedDotY);
    ctx.moveTo(beginDotX, beginDotY);
    // ctx.lineTo(beginDotX, beginDotY);
    ctx.lineTo(endDotX, endDotY);
    ctx.closePath();                                                                                                //创建当前点和上一个点连接形成的path
    ctx.stroke();                                                                                                   //画线：涂满路径
}

function fillDots(num, arrX, arrY){
    var canvas = document.getElementById("myCanvas");
    var ctx;
    ctx = canvas.getContext("2d");
    console.log('fillDots Running...');
    ctx.fillStyle = "rgba(198,118,107,0.46)";
    ctx.beginPath();                                                                                    //填充选中区域,%为透明度
    ctx.moveTo(arrX[0], arrY[0]);
    for (var i = 0; i < num; i++) {
        ctx.lineTo(arrX[i], arrY[i]);
    }
    ctx.closePath();
    ctx.fill();
}