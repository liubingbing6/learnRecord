define(['jquery'],function($){
	function BackTop(opts){
		//传入的参数覆盖默认参数
		this.opts = $.extend({},BackTop.DEFAULTS,opts);
		//获取当前要操作的对象
		this.el = $('html,body');
		
	}
	//定义以运动的方式到达目标点
	BackTop.prototype.move = function(){
		//定义一个局部变量来接收参数，这样可以提高性能
		var opts = this.opts;
		//判断滚动条是否到达指定位置
		if($(window).scrollTop() != opts.dist){
			//判断当前是否还在执行动画
			if(!this.el.is(':animated')){
				//执行动画
				this.el.animate({'scrollTop' : opts.dist},opts.speed);	
			}	
		}	
	}
	//定义直接到达目标点
	BackTop.prototype.goTo = function(){
		var opts = this.opts;
		if($(window).scrollTop() > opts.dist){
			this.el.scrollTop(0);
		}
	}
	
	//定义默认的参数
	BackTop.DEFAULTS = {
		dist:0,
		speed:800	
	}
	
	
	//对外提供接口
	return {
		BackTop:BackTop		
	}
});