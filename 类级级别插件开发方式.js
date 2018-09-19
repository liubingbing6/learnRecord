//1.添加新的全局函数
//调用方式为：$.myAlert()
jQuery.myAlert = function(){

}

//2.使用$.extend(obj);
//调用方式为：$.myAlert()
jQuery.extend({
	myAlert:function(){

	},
	myAlert2:function(){

	}
})
//3.使用命名空间,这里的名字自己定义
//调用方式为：$.zxit.myAlert()
jQuery.zxit = {
	myAlert : function(){

	},
	myAlert2 :function(){

	}
}