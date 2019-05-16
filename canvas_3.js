/**
 * Created by Yixin on 2019/5/5
 **/

var posi_num = 0;
var posi = new Array();                             //定义位置数组
for(var i = 0; i<100 ; i++) {
    posi[i] = new Array(0, 0);
    //console.log(i);
    //console.log(posi[i]);
}


// function getMousePos(event) {
//         var e = event || window.event;
//         return {'x':e.screenX,'y':screenY}
// }

function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    //alert('x: ' + x + '\ny: ' + y);
    return { 'x': x, 'y': y };
}

function onClick(ev){
    ev = ev || window.event;
    var mousePos = getMousePos(event);
    document.getElementById('x').innerHTML = mousePos.x;
    document.getElementById('y').innerHTML = mousePos.y;
    // posi[posi_num][0] = mousePos.x;             //将点击的位置存入数组中
    // posi[posi_num][1] = mousePos.y;
    // // console.log("X:"+mouseX+"\t Y:"+mouseY+"\t num:"+ posi_num);
    // drawLine(posi_num);
    // posi_num++;
}

// function drawLine(num){
//     var canvas = document.getElementById("myCanvas");           //获取元素
//     var ctx;
//     if(canvas.getContext) {
//         ctx = canvas.getContext("2d");
//         ctx.beginPath();
//         ctx.strokeStyle = "red";
//         ctx.lineWidth = 10;
//         ctx.lineJoin = "round";
//         if(num == 0){}  //绘制直线线段起始坐标点
//         else{
//             ctx.moveTo(posi[num][0], posi[num][1]);
//             ctx.lineTo(posi[num-1][0], posi[num-1][1]);
//             ctx.closePath();
//             ctx.stroke();
//             //console.log(posi[num][0], posi[num][1]);
//         }
//     }

    screen.onclick = onClick;