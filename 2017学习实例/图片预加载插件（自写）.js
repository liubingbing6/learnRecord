;(function ($) {
	function PreLoad(imgs,options) {
		this.imgs = (typeof images === 'string') ? [imgs] : imgs;
		this.DEFAULTS = {	//默认配置
			order: 'unordered',
			each : null,	//每一张图片加载完毕后执行
			all  : null     //所有图片加载完毕后执行
		};
		this.opts = $.extend({},this.DEFAULTS,options);

		if(this.opts.order === 'ordered'){
			this._ordered();
		}else{
			this._unordered();
		}
	}
	PreLoad.prototype._ordered = function () {		//有序加载
		var imgs = this.imgs,
			count = 0,
			len = imgs.length,
			opts = this.opts;
		var imgObj = new Image();
			$(imgObj).on('load error',function () {
				opts.each && opts.each(count);
				if (count >= len -1) {
					opts.all && opts.all();
				}else{
					this._ordered();
				}
				count++;
			});
			imgObj.src = imgs[count];
	};
	PreLoad.prototype._unordered = function () {	//无序加载
		var imgs = this.imgs,
			count = 0,
			len = imgs.length,
			opts = this.opts;

		$.each(imgs,function(i, val) {
			if (typeof val !== 'string') return;
			var imgObj = new Image();
			$(imgObj).on('load error',function () {
				opts.each && opts.each();
				if(count >= len - 1){
					opts.all && opts.all();
				}
				count++;
			})
			imgObj.src = src;
		});
	}
	$.extend({
		preload : function(imgs,opts) {
			new Preload(imgs,opts);
		}
	})
})(jQuery)