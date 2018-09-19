// canvas圆弧与圆角矩形学习2；绘制圆角边框，与绘制有填充色的圆角边框
window.onload = function(){
	var canvas = document.getElementById('canvas');
	
		canvas.width = document.documentElement.clientWidth;
		canvas.height = document.documentElement.clientHeight;
		
	var context = canvas.getContext('2d');	
	
	fillRoundRect(context,100,100,500,500,10,'#bbada0');
	for(var i = 0;i < 4; i++)
		for(var j = 0; j < 4; j++){
			fillRoundRect(context,120 + i * 120,120 + j*120,100,100,6,'#ccc0b3');
		}

}
//绘制圆角矩形
function fillRoundRect(cxt,x,y,width,height,radius,/*options*/fillColor){
	if(2*radius > width || 2*radius > height) return;
	
	cxt.save();
	
	cxt.translate(x,y);
	pathRoundRect(cxt,width,height,radius);
	cxt.fillStyle = fillColor || 'black';
	cxt.fill();
	
	cxt.restore();
};

function strokeRoundRect(cxt,x,y,width,height,radius,/*options*/lineWidth,/*options*/strokeColor){
	if(2*radius > width || 2*radius > height) return;
	
	cxt.save();
	
	cxt.translate(x,y);
	cxt.pathRoundRect(cxt,width,height,radius);
	cxt.lineWidth = lineWidth || 1;
	cxt.strokeStyle = strokeColor || 'black';
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