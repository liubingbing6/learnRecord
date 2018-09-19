//canvas线性渐变

window.onload = function(){
	var canvas = document.getElementById('canvas');
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	var context = canvas.getContext('2d');
	
	var linearGrad = context.createLinearGradient(0,0,800,800);//水平设置为：800,0,垂直：0,800
	linearGrad.addColorStop(0.0,'white');
	linearGrad.addColorStop(0.25,'yellow');
	linearGrad.addColorStop(0.5,'green');
	linearGrad.addColorStop(0.75,'red');
	linearGrad.addColorStop(1.0,'blue');
	
	context.fillStyle = linearGrad;
	context.fillRect(0,0,800,800);
}
