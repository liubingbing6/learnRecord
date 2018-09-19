//canvas图片使用学习1

window.onload = function(){
	var canvas = document.getElementById('canvas');
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight;
	var context = canvas.getContext('2d');
	
	var bgm = new Image();
	bgm.src = "image/logo_xin_03.png";
	bgm.onload = function(){
		var pattern = context.createPattern(bgm,'repeat');
		context.fillStyle = pattern;
		context.fillRect(0,0,800,800);	
	}
}
