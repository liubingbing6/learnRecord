
window.onload = function(){
	var canvas = document.getElementById('canvas');
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	var context = canvas.getContext('2d');
	
	context.fillStyle = 'black';
	context.fillRect(0,0,canvas.width,canvas.height);
	
	//drawStart(context,100,200,200,200,30);
	
	for(var i = 0;i<200;i++){
		var r = Math.random()*10+10;
		var x = Math.random()*canvas.width;
		var y = Math.random()*canvas.height;
		var rot = Math.random()*360;
		drawStart(context,r,r/2.0,x,y,rot);	
	}
	
}
function drawStart(cxt,r,R,x,y,rot){
	cxt.beginPath();
	
	for(var i=0;i<5;i++ ){
		cxt.lineTo(Math.cos((18+i*72-rot)/180*Math.PI)*R+x, 
		-Math.sin((18+i*72-rot)/180*Math.PI)*R+y);	
		cxt.lineTo(Math.cos((54+i*72-rot)/180*Math.PI)*r+x,
		-Math.sin((54+i*72-rot)/180*Math.PI)*r+y);
	}
	
	cxt.closePath();
	
	cxt.fillStyle = '#fb3';
	cxt.strokeStyle = '#fd5';
	cxt.lineWidth = 3;
	cxt.lineJoin = 'round';
	
	cxt.fill();
	cxt.stroke();
}