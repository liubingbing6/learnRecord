var url = "http://192.168.1.2:8888/";
creatLi();
/* 获取数据，生成内容 */
function creatLi(isLoad){
	var list = document.querySelector('#list');
	var first = getFirst();
	ajax("get",url,"",function(data){
		data = JSON.parse(data);
		for(var i = 0; i < data.length; i++){
			var li = document.createElement('li');
			li.innerHTML = '<div class="swiper"><div class="view"><span class="avatar" style="background-image:url('+data[i].avatar+');"></span><div class="info"><h3>'+data[i].username+'</h3><p>'+data[i].new_message+'</p></div><aside class="aside"><time>'+getDate(data[i].date_time)+'</time> <mark style="display:'+(data[i].message_number > 1?'block':'none')+'">'+data[i].message_number+'</mark></aside></div><nav class="btns"><a href="javascript:;">置顶</a> <a href="javascript:;">'+(data[i].message_number > 1?'标记已读':'标记未读')+'</a> <a href="javascript:;">删除</a></nav></div>';
			list.insertBefore(li,first);
			setEv(li);
		}
		if(isLoad){
			var swiper = document.querySelector('#swiper');
			var load = document.querySelector('#load');
			var loadImg = load.querySelector('.loadImg');
			var loadImg2 = load.querySelector('.loadImg2');
			var loadText = load.querySelector('.loadText');
			loadImg2.style.display = "none";
			loadText.innerHTML = "刷新完成";
			setTimeout(function(){
				css(swiper,"translateY",0);
				swiper.addEventListener('WebkitTransitionEnd', end);
				swiper.addEventListener('transitionend', end);
				function end(){
					swiper.removeEventListener('WebkitTransitionEnd', end);
					swiper.removeEventListener('transitionend', end);
					loadImg.style.display = "block";
					loadText.innerHTML = "下拉刷新";
				}
			},500);
		}
	});
}
/* 给生成的li添加事件 */
function setEv(li){
	var swiper = li.querySelector('.swiper');
	var max = li.clientWidth - swiper.offsetWidth;
	var list = document.querySelector('#list');
	var mark = li.querySelector('mark');
	var btns = li.querySelector('.btns');
	var btn = btns.children;
	var isReader = false;//是否读取
	var isTop = false;
	if(btn[1].innerHTML == "标记未读"){
		isReader = true;
	}
	tap(btn[0],function(){
		if(isTop){
			this.innerHTML = "置顶";
			li.className = "";
		} else {
			this.innerHTML = "取消置顶";
			li.className = "active";	
		}
		isTop = !isTop;
		swiper.addEventListener('WebkitTransitionEnd', end);
		swiper.addEventListener('transitionend', end);
		swiper.style.transition = ".3s";
		css(swiper,"translateX",0);
		function end(){
			swiper.removeEventListener('WebkitTransitionEnd', end);
			swiper.removeEventListener('transitionend', end);
			if(isTop){
				var first = list.children[0];
			} else {
				var first = getFirst();
			}
			list.insertBefore(li,first);
		}
	});
	tap(btn[1],function(){
		if(isReader){
			this.innerHTML = "标记已读";
			mark.innerHTML = "1";
			mark.style.display = "block";
		} else {
			mark.style.display = "none";
			this.innerHTML = "标记未读";
		}
		isReader = !isReader;
		swiper.style.transition = ".3s";
		css(swiper,"translateX",0);
	});
	tap(btn[2],function(){
		list.removeChild(li);
		var main = document.querySelector('#main');
		var swiper = document.querySelector('#swiper');
		var max = main.clientHeight - swiper.offsetHeight;
		var now = css(swiper,"translateY");
		console.log(max,now);
		if(now < max){
			cancelAnimationFrame(swiper.timer);
			swiper.style.transition = ".3s";
			css(swiper,"translateY",max);
		}
	});
	// tap(li,function(){
	// 	alert(1);
	// });
	mScroll({
		el:li,
		dir:"x",
		start: function(){
			var swipers = list.querySelectorAll('.swiper');
			for(var i = 0; i < swipers.length; i++){
				if(swipers[i] != swiper){
					var now = css(swipers[i],"translateX");
					if(now < 0) {
						swipers[i].style.transition = ".3s";
						css(swipers[i],"translateX",0);
					}
				}

			}
			swiper.style.transition = "none";
		},
		move: function(){
			var now = css(swiper,"translateX");
			if(now > 0){
				now = 0;
			} else if(now < max){
				now = max;
			}
			css(swiper,"translateX",now);
		},
		end: function(dir){//dir 最后一次滑动的方向
			cancelAnimationFrame(swiper.timer);
			swiper.style.transition = ".3s";
			var now = css(swiper,"translateX");
			if(now == 0){
				return;
			}
			if(dir > 0){
				css(swiper,"translateX",0);
			} else if(dir < 0){
				css(swiper,"translateX",max);
			}
		}
	});
}
function getFirst(){
	var list = document.querySelector('#list');
	var active = list.querySelectorAll('li.active');
	if(active.length > 0){
		return active[active.length-1].nextElementSibling;
	}
	return list.children[0];
}
document.addEventListener('touchstart', function(e) {
	e.preventDefault();
});

(function(){
	var main = document.querySelector('#main');
	var swiper = document.querySelector('#swiper');
	var load = document.querySelector('#load');
	var loadImg = load.querySelector('.loadImg');
	var loadImg2 = load.querySelector('.loadImg2');
	var loadText = load.querySelector('.loadText');
	var loadH = load.offsetHeight;
	// css(main,"translateY",100)
	// console.log(css(main,"translateY"));
	loadImg.style.transition = ".3s";
	mScroll({
		el:main,
		dir: "y",
		start:function(){
			swiper.style.transition = "none";
		},
		move: function(){
			var now = css(swiper,"translateY");
			if(now > loadH){
				css(loadImg,"rotate",-180);
				loadText.innerHTML = "释放立即刷新";
			} else {
				css(loadImg,"rotate",0);
				loadText.innerHTML = "下拉刷新";
			}
		},
		end: function(){
			var now = css(swiper,"translateY");
			if(now > loadH){
				cancelAnimationFrame(swiper.timer);
				swiper.style.transition = ".3s";
				css(swiper,"translateY",loadH);
				loadImg.style.display = "none";
				loadImg2.style.display = "block";
				loadText.innerHTML = "正在刷新";
				swiper.addEventListener('WebkitTransitionEnd', end);
				swiper.addEventListener('transitionend', end);
				function end(){
					swiper.removeEventListener('WebkitTransitionEnd', end);
					swiper.removeEventListener('transitionend', end);
					creatLi(true);
				}
			}
		}
	});
})();
/*
	mScroll 滑屏
	init:{
		el:element,(滑屏区域)
		dir:"x"||"y"(滑屏方向),
		start:fn,(手指按下的回调)
		move:fn,(手指移动的回调),
		end:fn(手指抬起的回调)
	}
*/
function mScroll(init){
	var swiper = init.el.children[0];
	var startPoint = {};
	var startEl = {};
	var lastPoint = {};
	var dir = init.dir;
	var lastDir = 0;
	var max = {
		x: parseInt(css(init.el,"width") - css(swiper,"width")),
		y: parseInt(css(init.el,"height") - css(swiper,"height"))
	};
	var translate = {
		x: "translateX",
		y: "translateY"
	};
	var isMove = {
		x: false,
		y: false
	};
	var isFrist = true;//记录这是第一次滑动 

	// css(swiper,"translateX",0);
	// css(swiper,"translateY",0);
	css(swiper,translate[dir],0);
	init.el.addEventListener('touchstart', function(e) {
		init.start&&init.start();
		var touch = e.changedTouches[0];
		startPoint = {
			x: Math.round(touch.pageX),
			y: Math.round(touch.pageY)
		};
		lastPoint= {
			x: startPoint.x,
			y: startPoint.y
		};
		startEl = {
			x: css(swiper,"translateX"),
			y: css(swiper,"translateY")
		};

		max = {
			x: parseInt(css(init.el,"width") - css(swiper,"width")),
			y: parseInt(css(init.el,"height") - css(swiper,"height"))
		}
		lastDir = 0;
	});
	init.el.addEventListener('touchmove', function(e) {
		var touch = e.changedTouches[0];
		var nowPoint = {
			x: Math.round(touch.pageX),
			y: Math.round(touch.pageY)
		}
		if(lastPoint.x == nowPoint.x && lastPoint.y == nowPoint.y){
			return;
		}
		var dis = {
			x: nowPoint.x - startPoint.x,
			y: nowPoint.y - startPoint.y
		}
		/* 这个判断只在我手指按下时，第一次move时才会执行 */
		if(Math.abs(dis.x) - Math.abs(dis.y) > 2 && isFrist){
			isMove.x = true;
			isFrist = false;
		} else if(Math.abs(dis.y) - Math.abs(dis.x) > 2 && isFrist){
			isMove.y = true;
			isFrist = false;
		}
		lastDir = nowPoint.x - lastPoint.x;
		var target = {};
		target[dir] = dis[dir] + startEl[dir];
		isMove[dir]&&css(swiper,translate[dir],target[dir]);
		//console.log(dis);
		init.move&&init.move();
		lastPoint.x = nowPoint.x;
		lastPoint.y = nowPoint.y;
	});
	init.el.addEventListener('touchend', function(e) {
		var now = css(swiper,translate[dir]);
		if(now < max[dir]){
			now =  max[dir];
		} else if(now > 0){
			now = 0;
		}
		var target = {};
		target[translate[dir]] = now;
		startMove({
			el: swiper,
			target:target,
			type: "easeOut",
			time: 300
		});
		isMove = {
			x: false,
			y: false
		}
		isFrist = true;
		init.end&&init.end(lastDir);
	});
}
/* 
	tap 移动端点击事件 
	el
	fn
*/
function tap(el,fn){
	var startPoint = {};
	el.addEventListener('touchstart', function(e) {
		var touch = e.changedTouches[0];
		startPoint = {
			x: touch.pageX,
			y: touch.pageY
		}
	});
	el.addEventListener('touchend', function(e) {
		var touch = e.changedTouches[0];
		var nowPoint = {
			x: touch.pageX,
			y: touch.pageY
		};
		var dis = {
			x: Math.abs(nowPoint.x - startPoint.x),
			y: Math.abs(nowPoint.y - startPoint.y)
		} 
		if(dis.x < 5 && dis.y < 5){
			fn.call(el,e);
		}
	});
}