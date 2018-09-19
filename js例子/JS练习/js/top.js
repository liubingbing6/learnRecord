// JavaScript Document
$(function(){
	$("#div2").bind('click',function(){
		$("html,body").animate({scrollTop:0},500);								 
	});	
	//var clHeight=document.documentElement.clientHeight||document.body.clientHeight;
	var clHeight=$(window).height();//获取可视区高度
	$(window).bind('scroll',function(){
		var osTop=$(document).scrollTop();//获取滚动条距离顶部的距离
	if(osTop>=clHeight){
		$("#div2").css("display","block");
		}
	else{
		$("#div2").css("display","none");
		}
	});
});