requirejs.config({
	paths:{
		jquery:	"jquery-1.9.1"	//jquery文件与main文件在同一个文件夹下
	}	
});
requirejs(['jquery','scrollTo'],function($,scrollto){
	/*new scrollto.scrollTop($('#backTop'),{
		mode:'move',
		pos:500,
		speed:2000	
	})._checkPosition();*/	
	$('#backTop').backtop({
		mode:'t'	
	});
	
	//var obj = new backtop.BackTop({});
	//$('#backTop').on('click',$.proxy(obj.goTo,obj));//改变函数中this的指向
	
	/*$(window).on('scroll',function(){
		checkPosition($(window).height());
	});
	
	checkPosition($(window).height());
	
	
	function move(){
		$('html,body').animate({'scrollTop':0},800);	
	}	
	function checkPosition(pos){
		if($(window).scrollTop() > pos){
			$('#backTop').fadeIn();	
		}else{
			$('#backTop').fadeOut();	
		}
	}*/
});