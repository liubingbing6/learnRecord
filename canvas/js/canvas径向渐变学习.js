//canvas径向渐变

window.onload = function(){
	var canvas = document.getElementById('canvas');
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	var context = canvas.getContext('2d');
	
	var radialGrad = context.createRadialGradient(300,300,100,300,300,300);
	/*context.createRadialGradient(x0,y0,r0,x1,y1,r1);
	x0	渐变的开始圆的 x 坐标
	y0	渐变的开始圆的 y 坐标
	r0	开始圆的半径
	x1	渐变的结束圆的 x 坐标
	y1	渐变的结束圆的 y 坐标
	r1	结束圆的半径*/
	radialGrad.addColorStop(0.0,'white');
	radialGrad.addColorStop(0.25,'yellow');
	radialGrad.addColorStop(0.5,'green');
	radialGrad.addColorStop(0.75,'red');
	radialGrad.addColorStop(1.0,'blue');
	
	context.fillStyle = radialGrad;
	context.fillRect(0,0,800,800);
}
