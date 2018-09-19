// JavaScript Document
var total = 17;
var zWin = $(window);
var cid;
var wLarge = $('#large_img');

var render = function(){
	var padding = 2;
	var winWidth = zWin.width();
	var winHeight = zWin.height();
	var picWidth = Math.floor((winWidth-padding*3)/4);
	var tmpl = '';
	for(var i=1;i<=total;i++){
		var p = padding;
		var imgSrc = 'image/'+i+'.jpg';
		if(i%4==1){
			p = 0;	
		}
		tmpl +='<li data-id="'+i+'" class="animated rollIn" style="width:'
			 +picWidth+'px;height:'+picWidth+'px;padding-top:'+padding+'px;padding-left:'
			 +p+'px;"><canvas id="cvs_'+i+'"></canvas></li>';
		
		var imgObj = new Image();
		imgObj.index = i;
		imgObj.onload = function(){
			var context = $('#cvs_'+this.index)[0].getContext('2d');
			context.width = this.width;
			context.height = this.height;
			context.drawImage(this,0,0);	
		};
		imgObj.src = imgSrc;
		$('.animated').one('webkitAnimationEnd',function(){
				$(this).removeClass('animated rollIn');	
		});
		
	}
	$("#container").html(tmpl);	
};
render();

var loadImage = function(id,callback){
	$('#large_con').css({
		width:zWin.width(),
		height:zWin.height()	
	}).show();
	var imgsrc = 'image/'+id+'.large.jpg';
	var imgObj = new Image();
	imgObj.onload = function(){
		var w = this.width;
		var h = this.height;
		var winWidth = zWin.width();
		var winHeight = zWin.height();
		var realw = winHeight*w/h;
		var paddingLeft = parseInt((winWidth-realw)/2);
		var realh = winWidth*h/w;
		var paddingTop = parseInt((winHeight-realh)/2);
		wLarge.css('width','auto').css('height','auto');
		wLarge.css('padding-left','0px').css('padding-top','0px');
		if(h/w>1.2){
			wLarge.attr('src',imgsrc).css('height',winHeight).css('padding-left',paddingLeft);
		}else{
			wLarge.attr('src',imgsrc).css('width',winWidth).css('padding-top',paddingTop);
		}	
		callback&&callback();
	};
	imgObj.src = imgsrc;	
};

$('#container').delegate('li','tap',function(){//事件委托
	var _id = cid = $(this).attr('data-id');
	loadImage(_id);
});

$('#large_con').tap(function(){
	$(this).hide();	
}).swipeLeft(function(){
	cid++;
	if(cid>total){
		cid=total;	
	}else{
		loadImage(cid,function(){
			wLarge.addClass('animated bounceInRight').one('webkitAnimationEnd',function(){
				$(this).removeClass('animated bounceInRight');	
			});
		});
	}	
}).swipeRight(function(){
	cid--;
	if(cid<1){
		cid=1;
	}else{
		loadImage(cid,function(){
			wLarge.addClass('animated bounceInLeft').one('webkitAnimationEnd',function(){
				$(this).removeClass('animated bounceInLeft');	
			});
		});	
	}
});