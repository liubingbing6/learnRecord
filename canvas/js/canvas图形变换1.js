//canvas图形变换

window.onload = function(){
	var canvas = document.getElementById('canvas');
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	var context = canvas.getContext('2d');
	
	var linearGrad = context.createLinearGradient(0,0,0,canvas.height);//利用线性渐变
	//var linearGrad = context.createRadialGradient(canvas.width/2,canvas.height,0,canvas.width/2,canvas.height,canvas.height);//利用径向渐变
	linearGrad.addColorStop(0.0,'#000');
	linearGrad.addColorStop(1.0,'#035');
	
	context.fillStyle = linearGrad;
	context.fillRect(0,0,canvas.width,canvas.height);
	
	//drawStart(context,100,200,200,200,30);
	
	for(var i = 0;i<200;i++){
		var r = Math.random()*5+5;
		var x = Math.random()*canvas.width;
		var y = Math.random()*canvas.height * 0.65;//添加一个摩擦系数，使绘制出来的图形距离底部有一定的距离，造成一种有天地的感觉
		var rot = Math.random()*360;
		drawStart(context,x,y,r,rot);	
	}
	
	//绘制月亮
	fillMoon(context,2,1100,150,100,15);
	
	//绘制一篇绿地
	drawLand(context);
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

//绘制月亮的函数
function fillMoon(cxt,d,x,y,R,rot,fillColor){
	cxt.save();
	
	cxt.translate(x,y);
	cxt.rotate(rot * Math.PI / 180);
	cxt.scale(R,R);
	pathMoon(cxt,d);
	cxt.fillStyle = fillColor || '#fb5';
	cxt.fill();
	
	cxt.restore();	
}

function pathMoon(cxt,d){
	cxt.beginPath();
	
	cxt.arc(0,0,1,0.5*Math.PI,1.5*Math.PI,true);
	cxt.moveTo(0,-1);
	cxt.arcTo(d,0,0,1,dis(0,-1,d,0) / d);
	
	cxt.closePath();
}

function dis(x1,y1,x2,y2){
	return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

//绘制绿地
function drawLand(cxt){
	cxt.save();
	
	cxt.beginPath();
	cxt.moveTo(0,500);
	cxt.bezierCurveTo(540,400,460,700,1366,500);
	cxt.lineTo(1400,800);
	cxt.lineTo(0,800);
	
	cxt.closePath();
	var landStyle = cxt.createLinearGradient(0,800,0,0);
	landStyle.addColorStop(0.0,'#030');
	landStyle.addColorStop(1.0,'#580');
	cxt.fillStyle = landStyle;
	cxt.fill();
	
	cxt.restore();	
}