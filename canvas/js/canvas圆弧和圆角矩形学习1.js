// canvas圆弧与圆角矩形学习
window.onload = function(){
	var canvas = document.getElementById('canvas');
	
		canvas.width = document.documentElement.clientWidth;
		canvas.height = document.documentElement.clientHeight;
		
	var context = canvas.getContext('2d');	
	
	drawRoundRect(context,100,100,600,500,50);

}
//绘制圆角矩形
function drawRoundRect(cxt,x,y,width,height,radius){
	cxt.save();
	
	cxt.translate(x,y);
	pathRoundRect(cxt,width,height,radius);
	cxt.strokeStyle = 'black';
	cxt.stroke();
	
	cxt.restore();	
};

function pathRoundRect(cxt,width,height,radius){
	cxt.beginPath();
	
	cxt.arc(width - radius,height - radius,radius,0,Math.PI/2);
	cxt.lineTo(radius,height);
	cxt.arc(radius,height - radius,radius,Math.PI/2,Math.PI);
	cxt.lineTo(0,radius);
	cxt.arc(radius,radius,radius,Math.PI,Math.PI*3/2);
	cxt.lineTo(width - radius,0);
	cxt.arc(width - radius,radius,radius,Math.PI*3/2,Math.PI*2);
	
	cxt.closePath();
};