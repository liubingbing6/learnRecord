/**
 * Created by zqf on 2017/3/28.
 */
$(function(){
    // $("#qq_consult").click(function(){
    //     var qq_val=$("#qq_val").val();
    //     qq(qq_val);
    // });
})
function qq(qq_val){
    if(is_baidu_browser()){
        alert("此浏览器不支持该功能！请用其他浏览器打开！");
    }else{
        window.location.href= 'mqqwpa://im/chat?chat_type=wpa&uin='+qq_val+'&version=1&src_type=web&web_src=oicqzone.com';
        console.log(qq_val);
    }
    if(isWeiXin()){
        $('.service-shadow').hide();
        $('.wx-shadow').show();
        $('#know').click(function(){
            $('.wx-shadow').hide();
        })

        //window.location.href='http://wpa.qq.com/msgrd?v=3&uin='+qq_val+'&site=qq&menu=yes';

    }
}

function is_baidu_browser () {
    var userAgent = navigator.userAgent;
    var is_baidu = userAgent.indexOf("Baidu");
    if(is_baidu>=0){
        return true;
    }else {
        return false;
    }
}
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
/**
 * by yd
 * @returns {boolean}
 */
function isQQ() {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.indexOf('qq/')!= -1){
        return true;
    } else{
        return false;
    }
}