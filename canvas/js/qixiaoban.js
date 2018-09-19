// JavaScript Document
/*window.onload = function(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	context.moveTo(100,100);
	context.lineTo(700,700);
	context.lineTo(100,700);
	context.lineTo(100,100);
	
	context.fillStyle="rgb(2,100,30)";
	context.fill();
	
	context.lineWidth = 5;
	context.strokeStyle= "red";
	context.stroke();	
};*/
//绘制七巧板
/*var trangram = [
		{p:[{x:0,y:0},{x:800,y:0},{x:400,y:400}],color:"#caff67"},
		{p:[{x:0,y:0},{x:400,y:400},{x:0,y:800}],color:"#67becf"},
		{p:[{x:800,y:0},{x:800,y:400},{x:600,y:600}],color:"#ef3d61"},
		{p:[{x:600,y:200},{x:600,y:600},{x:400,y:400}],color:"#f9f51a"},
		{p:[{x:400,y:400},{x:600,y:600},{x:400,y:800}],color:"#a59430"},
		{p:[{x:200,y:600},{x:400,y:800},{x:0,y:800}],color:"#fa8ecc"},
		{p:[{x:800,y:400},{x:800,y:800},{x:400,y:800}],color:"#f6ca29"},
	];

window.onload = function(){
	var canvas = document.getElementById('canvas');
		canvas.width = '1024';
		canvas.height = '810'
	var context = canvas.getContext('2d');
		
	for(var i=0;i<trangram.length;i++){
		draw(trangram[i],context);	
	}
		
};
function draw(piece,cxt){
	cxt.beginPath();
	cxt.moveTo(piece.p[0].x,piece.p[0].y);
	for(var i=1;i<piece.p.length;i++){
		cxt.lineTo(piece.p[i].x,piece.p[i].y);	
	}
	cxt.closePath();
	
	cxt.fillStyle = piece.color;
	cxt.fill();	
	
	cxt.strokeStyle = 'black';
	cxt.lineWidth = 3;
	cxt.stroke();
}*/
window.onload = function(){
	var canvas = document.getElementById('canvas');
		canvas.width = '1024';
		canvas.height = '810'
	var context = canvas.getContext('2d');
	
		context.fillStyle = "red";

	for(var i=0;i<5;i++){
		context.beginPath();
		context.arc(50+i*100,60,40,0,0.2*Math.PI*(i+1));
		/*context.closePath();	*/	//‘开’与‘关’不是必须放在一起的。如果添加了‘关’，画的半圆会以直线(默认)连接。如果去掉了‘关’，在fill()填充时没有影响，和添加是的效果一样
		context.lineWidth = 2;
		context.stroke();
		
		context.fill();
	}	
};