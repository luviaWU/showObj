/**
 * Created by de on 2016/10/8.
 */
window.onload = function () {

    var chessBoard = [];
    var me = true;

    for(var i=0; i<15;i++){
        chessBoard[i] = [];
        for (var j=0; j<15;j++){
            chessBoard[i][j] = 0;
        }
    }

    var chess = document.getElementById("chess");
    var context = chess.getContext("2d");//获得其上下文

    context.strokeStyle = "#BFBFBF";//改变棋盘的线颜色

    var logo = new Image();//实现棋盘的水印画图片背景
    logo.src="images/1.jpg";
    logo.onload = function () {
        context.drawImage(logo, 0,0,450,450);//图片铺满棋盘
        drawChessBoard();//画完图片，再调用棋盘，实现背景效果，

    };

    var drawChessBoard = function () {  //画棋盘 //棋盘周边空白是15个像素，棋盘内每个格子的像素是30，30
        for(var i = 0; i<15; i++){
            context.moveTo(15 + i*30,15);//画线，列,纵
            context.lineTo(15 + i*30,435);
            context.stroke();
            context.moveTo(15,15 + i*30);//画线，行，横
            context.lineTo(435,15 + i*30);
            context.stroke();
        }
    };

    var oneStep = function (i,j,me) {   //(i、j是索引，me代表黑棋还是白棋)
        context.beginPath();
        context.arc(15 + i*30,15 + j*30,13,0,2 *Math.PI);//arc：这里画圆，还可以画扇形  画圆参数(圆心坐标，圆心坐标，半径，起始弧度，终止弧度)
        context.closePath();
        var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,15,15+i*30+2,15+j*30-2,0);//(第一个圆心坐标，第一个圆心坐标y，第一个圆半径50，第二个圆心坐标，第二个圆心坐标，第二个圆半径)
        if(me){
            gradient.addColorStop(0,"#0A0A0A");//设置渐变色
            gradient.addColorStop(1,"#636766");//设置渐变色
        }else{
            gradient.addColorStop(0,"#D1D1D1");//设置渐变色
            gradient.addColorStop(1,"#F9F9F9");//设置渐变色
        }

        context.fillStyle = gradient;
        context.fill();//颜色填充
    };

    chess.onclick = function (e) {  //下棋，落棋子事件
        var x = e.offsetX;
        var y = e.offsetY;
        var i = Math.floor(x/30);
        var j = Math.floor(y/30);
        if(chessBoard[i][j] == 0){
            oneStep(i,j,me);
            if(me){
                chessBoard[i][j] = 1;
            }else{
                chessBoard[i][j] = 2;
            }
            me = !me;
        }
        console.log("x:"+x);
        console.log("y:"+y);
        console.log("i:"+i);
        console.log("j:"+j);

    };

};
