//第一种常见封装
/*var uexWidget = {};
function startWidget(appId,animiId,funName,info,animDuration) {
	// body...
}
uexWidget.startWidget=startWidget;

// uexWidget={
// 		startWidget: startWidget,
// 		finishWidget: finishWidget
// 	}*/

//第二种常见封装
uexWidget=(function() {
	function startWidget(appId,animiId,funName,info,animDuration) {
	// body...
	}
	function finishWidget(resultInfo,appId,isWgtBG) {
	// body...
	}
	return {
		startWidget: startWidget,
		finishWidget: finishWidget
	}
})();

appcan.widget.isAppInstalled({
	appData:"sdds",
	callback:function(data){
		if(data.installed == 0){

		}
	}
});

appcan.window.getOpertion(function(a,b,c){
	
});
// -----------------------------------------------------------------------------------
Person = {
		run : function () {
			alert('running');
		},
	}
Man = {
	fight : function (n) {
		alert(n+'fight');
	},
}
Man.run.call(this,2);