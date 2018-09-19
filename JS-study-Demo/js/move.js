//JavaScript Document
function getStyle(obj,name){//获取节点的元素属性
	if(obj.currentStyle){//兼容IE浏览器
		return obj.currentStyle[name];
		}
	else{
		return getComputedStyle(obj,false)[name];//兼容Chrom，火狐等浏览器
		}
	}
function startMove(obj,json,func){//设置函数：对obj对象操作达到json中的要求，func是一个函数：做obj完成后的下一个动作。可理解此为链式运动。
	
	clearInterval(obj.timer);//关闭定时器
obj.timer=setInterval(function(){//打开定时器
	var allTimerStop=true;						//假设：所有的定时器都已经关闭   
	for(var attr in json)//循环遍历json数组中的每一个要达到目标的属性值
	{
		if(attr=='opacity'){//对透明度属性单独设置，这里假设当前的属性为opacity
			cur=Math.round(parseFloat(getStyle(obj,attr))*100);//因为opacity值是小数，所以这里四舍五入取整
			}
		else{
			cur=parseInt(getStyle(obj,attr));//获得该节点所需更改的属性
			}
		var speed=(json[attr]-cur)/8; //设置一个值，表示改变的速度
		speed=speed>0?Math.ceil(speed):Math.floor(speed);//对速度取整
		
		if(json[attr]!=cur){//判断只要当前有一个属性值没达到预期，那定时器就不能关闭，反之，则关闭
			allTimerStop=false; 
			}
		if(attr=='opacity'){//如果当前是透明度变化，则做兼容性测试
			obj.style.filter='alpha(opacity:'+(speed+cur)+')';//IE兼容
			obj.style.opacity=(cur+speed)/100;//火狐，Chrom等浏览器兼容
			}
		else{
				obj.style[attr]=cur+speed+'px';//对当前属性
			}
	 }
	 	if(allTimerStop){//如果所有的定时器都关闭了，则为true
			clearInterval(obj.timer);
			if(func)func();//如果func函数存在，那就执行它
			}
		  
		},30);
	}