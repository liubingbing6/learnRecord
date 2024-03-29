// canvas圆弧与圆角矩形学习3；arcTo的使用
window.onload = function(){
	var canvas = document.getElementById('canvas');
	
		canvas.width = document.documentElement.clientWidth;
		canvas.height = document.documentElement.clientHeight;
		
	var context = canvas.getContext('2d');	

	fillMoon(context,2,300,300,200,0);
}

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
	//cxt.arcTo(d,0,0,1,dis(0,-1,d,0) / d);
	
	cxt.quadraticCurveTo(1.2,0,0,1);  //二次贝塞尔曲线
	
	cxt.closePath();
}

function dis(x1,y1,x2,y2){
	return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}