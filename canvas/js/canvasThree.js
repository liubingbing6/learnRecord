
window.onload = function(){
	var canvas = document.getElementById('canvas');
	canvas.width = 1024;
	canvas.height = 568;
	var context = canvas.getContext('2d');
	//绘制矩形
	/*context.beginPath();
	
	context.rect(10,10,300,300);
	
	context.fillStyle = 'yellow';
	context.lineWidth = 10;
	context.strokeStyle = '#ff4343';
	
	context.fill();
	context.stroke();*/
	//绘制五角星
	/*context.beginPath();
	
	context.strokeStyle = '#c90';
	
	for(var i=0;i<5;i++ ){
		context.lineTo(Math.cos((18+i*72)/180*Math.PI)*200+400, 
		-Math.sin((18+i*72)/180*Math.PI)*200+400);	
		context.lineTo(Math.cos((54+i*72)/180*Math.PI)*100+400,
		-Math.sin((54+i*72)/180*Math.PI)*100+400);
	}
	
	context.closePath();
	context.stroke();	*/
	context.lineWidth = 5;
	//lineCap = 'butt'(default),'round','square'//线条两端的帽子
	context.lineJoin = 'miter';//round 尖角形状
	//lineJoin = 'miter'(default),'bevel','round'
	//miterLimit 描述lineJoin内尖角和外尖角之间的距离，只有其属性是miter时才有效
	context.miterLimit = 40; //只有lineJoin的值为miter时才有效
	drawStar(context,10,200,200,200,30);
	drawStar(context,100,200,600,200,15);
}
function drawStar(cxt,r,R,x,y,rot){//rot:旋转角度
	cxt.beginPath();
	
	for(var i=0;i<5;i++ ){
		cxt.lineTo(Math.cos((18+i*72-rot)/180*Math.PI)*R+x, 
		-Math.sin((18+i*72-rot)/180*Math.PI)*R+y);	
		cxt.lineTo(Math.cos((54+i*72-rot)/180*Math.PI)*r+x,
		-Math.sin((54+i*72-rot)/180*Math.PI)*r+y);
	}
	
	cxt.closePath();
	cxt.stroke();	
};
