//canvas文字渲染；基础

window.onload = function(){
	var canvas = document.getElementById('canvas');
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	var context = canvas.getContext('2d');
	
	context.font = "bold 40px Arial";
	
	context.fillStyle = "#058";
	context.fillText("兵棒棒哒",40,40);
	
	//context.rotate(36 * Math.PI /180);
	context.lineWidth = 1;
	context.strokeStyle = "#058";
	context.strokeText("hello world",250,40);
	
	context.fillText("兵棒棒兵棒棒兵棒棒哒",40,80,200);//多了最有一个参数，表示压缩在这指定的距离内
	context.strokeText("hello worldhello worldhello world",250,80,200);
	
	
	var linearGrad = context.createLinearGradient(0,0,800,0);
	linearGrad.addColorStop(0.0,'red');
	linearGrad.addColorStop(0.25,'green');
	linearGrad.addColorStop(0.5,'blue');
	linearGrad.addColorStop(0.75,'gray');
	linearGrad.addColorStop(1.0,'yellow');
	context.fillStyle = linearGrad;
	context.fillText("我是啦啦啦啦",40,120)
	
	context.fillStyle = '#058';
	context.font = "bold 120px Arial";
	
	context.textAlign = 'center';//文本水平居中，还有left,right
	context.textBaseline = 'middle';//文本垂直居中,还有top,bottom
	context.fillText('CANVAS',canvas.width/2,canvas.height/2);
}