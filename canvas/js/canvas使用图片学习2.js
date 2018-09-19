//canvas图片学习2

window.onload = function(){
	var canvas = document.getElementById('canvas');
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	var context = canvas.getContext('2d');
	
	var bgCanvas = createBackgroundCanvas();
	//createPattern可以对一个canvas进行设置
	//createPattern还可以对视频进行设置：createPattern(video,repeat-style);
	var pattern = context.createPattern(bgCanvas,'repeat');
	context.fillStyle = pattern;   
	//到这里可以发现，fillStyle = color,gradient,imgage,canvas,video等多个值
	context.fillRect(0,0,600,600);
	

}

function createBackgroundCanvas(){
	var bgcanvas = document.createElement('canvas');
	bgcanvas.height = 100;
	bgcanvas.width = 100;
	var bgContext = bgcanvas.getContext('2d');
	//画一颗星星
	drawStart(bgContext,50,50,50,0);
	
	return bgcanvas;	
}

function drawStart(cxt,x,y,R,rot){
	cxt.save();
	//首先进行图形变换
	cxt.translate(x,y);
	cxt.rotate(rot/180*Math.PI);
	cxt.scale(R,R);//添加这个方法会对边线造成缩放，所以下面的线宽去掉了
	
	//绘制基本图形
	startPath(cxt);
	
	//进行形状绘制
	cxt.fillStyle = '#fb3';
	//cxt.strokeStyle = '#fb5';
	//cxt.lineWidth = 5;
	cxt.lineJoin = 'round';
	
	cxt.fill();
	//cxt.stroke();
	
	cxt.restore();
}

function startPath(cxt){
	cxt.beginPath();
	
	for(var i=0;i<5;i++ ){
		cxt.lineTo(Math.cos((18+i*72)/180*Math.PI), 
		-Math.sin((18+i*72)/180*Math.PI));	
		cxt.lineTo(Math.cos((54+i*72)/180*Math.PI)*0.5,
		-Math.sin((54+i*72)/180*Math.PI)*0.5);
	}
	
	cxt.closePath();
}