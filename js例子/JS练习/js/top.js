// JavaScript Document
$(function(){
	$("#div2").bind('click',function(){
		$("html,body").animate({scrollTop:0},500);								 
	});	
	//var clHeight=document.documentElement.clientHeight||document.body.clientHeight;
	var clHeight=$(window).height();//��ȡ�������߶�
	$(window).bind('scroll',function(){
		var osTop=$(document).scrollTop();//��ȡ���������붥���ľ���
	if(osTop>=clHeight){
		$("#div2").css("display","block");
		}
	else{
		$("#div2").css("display","none");
		}
	});
});