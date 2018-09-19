define(['jquery','backTop'],function($,backtop){
	//定义需要执行动画的对象，及参数
	function scrollTop(el,opts){
		//覆盖默认参数
		this.opts = $.extend({},scrollTop.DEFAULTS,opts);
		//将获取的元素转换为jQuery形式
		this.el = $(el);
		//调用backTop模块的功能
		this.backtop = new backtop.BackTop({
			dist:0,//到达的目标点
			speed:this.opts.speed	
		});
		//如果选择的当前模式为'move'，则执行move函数
		if(this.opts.mode == 'move'){
			//注意这里的this指向
			this.el.on('click',$.proxy(this._move,this));
		}else{
			this.el.on('click',$.proxy(this._goTo,this));	
		}
		//判断当前滚动条的位置来改变当前对象的显示方式
		$(window).on('scroll',$.proxy(this._checkPosition,this));
	}
	
	//设置默认参数
	scrollTop.DEFAULTS = {
		mode : 'move',
		speed : 800,
		pos : $(window).height()
	}
	//设置move运动函数，内部调用的是backtop内的move函数
	scrollTop.prototype._move = function(){
		this.backtop.move();
	}
	scrollTop.prototype._goTo = function(){
		this.backtop.goTo();	
	}
	//判断当前的对象是显示还是隐藏
	scrollTop.prototype._checkPosition = function(){
		var opts = this.opts;
		if($(window).scrollTop() > opts.pos){
			this.el.fadeIn();	
		}else{
			this.el.fadeOut();	
		}	
	}	
	//封装成jQuery插件,形成$('').backtop({})这种调用方式
	$.fn.extend({
		backtop : function(opts){
			//采用each遍历，是防止按类的方式获取的对象，就是这里的this如果形如$('.class')
			return this.each(function(){
				new scrollTop(this,opts);
			});			
		}
	});
	//向外提供调用接口
	return {
		scrollTop : scrollTop	
	}
});