// JavaScript Document
//画圆
function draw(id){
	var canvas=document.getElementById(id);
	var context=canvas.getContext('2d');
	context.fillStyle='#f1f2f3';
	context.fillRect(0,0,400,400);
	for(var i=1;i<11;i++){
	context.beginPath();
	context.arc(i*20,i*20,i*10,0,Math.PI*2,true);
	context.closePath();
	context.fillStyle='rgba(255,0,0,0.25)';
	context.fill();
	   }
	}
//绘制文字
/*function draw(id){
	var canvas=document.getElementById(id);
	var context=canvas.getContext("2d");
	context.fillStyle='green';//设置画布背景颜色
	context.fillRect(0,0,800,300);//设置画布大小
	context.fillStyle='#FFF';//设置接下来内容的填充颜色
	context.strokeStyle='#fff';//设置边框样式
	context.font='bold 40px "微软雅黑"';//设置字体的样式
	context.textBaseline='hanging';//设置字体对顶部的方式
	context.textAlign='start';//设置字体的对齐方式
	context.fillText('黄金钱包',50,50);//设置填充的字体，X,Y的坐标
	context.strokeText('黄金钱包',100,100);//设置边框内容，X,Y的坐标
	}*/
//临时存储与永久存储
/*function setValue(id){
	var tem=document.getElementById(id);
	var str=tem.value;
	//sessionStorage.setItem("mess",str);//临时存储
	sessionStorage.setItem("mess",str);//永久存储，但是网站关闭，信息就清空
	}
function getValue(id){
	var tem=document.getElementById(id);
	//var msg=sessionStorage.getItem("mess");
	var msg=sessionStorage.getItem("mess");
	tem.innerHTML=msg;
	}*/
//简单留言板制作
function setWords(id){
	var data=document.getElementById(id).value;
	var time=new Date().getTime();//获得时间戳
	sessionStorage.setItem(time,data);//按键值对方式存储
	//alert("数据已存储");
	}
function getWords(id){
	if(!sessionStorage){alert("为空")}
	var reselt="<table border='1' style='border-collapse:collapse'>";
	for(var i=0;i<sessionStorage.length;i++){
		var key=sessionStorage.key(i);//取出健
		var value=sessionStorage.getItem(key);//根据健取值
		var nowTime=new Date();
		nowTime.setTime(key);//设置当初保存该信息时的时间
		var changeTimeStyle=nowTime.toGMTString();//此处方便表示，转为了格林时间
		reselt+="<tr><td>"+'这是第'+(i+1)+'位'+"</td><td>"+value+"</td><td>"+changeTimeStyle+"</td></tr>";
		}
	var p=document.getElementById(id);
	p.innerHTML=reselt;//将表格加入标签内
	}
function clearWords(id){
	var p=document.getElementById(id);
	p.innerHTML='';
	sessionStorage.clear();
	}

































