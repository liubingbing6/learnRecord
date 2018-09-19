window.onload = function () {
	waterfall('main','box');
	var dataInt={'data':[
		{'src':'1.jpg'},
		{'src':'2.jpg'},
		{'src':'3.jpg'},
		{'src':'4.jpg'},
		{'src':'5.jpg'},
		{'src':'6.jpg'}
	]};

	window.onscroll = function () {
		//checkscrollside();
		if (checkscrollside()) {
			var oMain = document.getElementById('main');
			for(var i = 0, length1 = dataInt.data.length; i < length1; i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oMain.appendChild(oBox);
				var pic = document.createElement('div');
				pic.className = 'pic';
				oBox.appendChild(pic);
				var oImg = document.createElement('img');
				oImg.src = 'img/'+dataInt.data[i].src;
				pic.appendChild(oImg);
			}
		}
		waterfall('main','box');
	}
}
function waterfall(parent,box) {
	var oParent = document.getElementById(parent);//获取父级对象
	var aBoxs = getClassObj(oParent,box);
	var oBoxW = aBoxs[0].offsetWidth;
	var clientW = document.body.clientWidth || document.documentElement.clientWidth;
	var boxList = Math.floor(clientW/oBoxW);
	oParent.style.cssText = 'width:'+ oBoxW*boxList + 'px;margin:0 auto';
	//console.log(boxList);
	var listArr = [];
	for(var i = 0, length1 = aBoxs.length; i < length1; i++){
		if (i<boxList) {
			listArr.push(aBoxs[i].offsetHeight);

		}else {
			var minVal = Math.min.apply(null,listArr);//获取最小值
			var minIndex = getMinIndex(listArr,minVal);//获取最小值的下标
			aBoxs[i].style.position = 'absolute';
			aBoxs[i].style.top = minVal + 'px';
			aBoxs[i].style.left = aBoxs[minIndex].offsetLeft+'px';
			listArr[minIndex] += aBoxs[i].offsetHeight;
		}
	}
	//console.log(listArr);
}

//获取类名的节点
function getClassObj(parent,box) {
	var oParent = parent.getElementsByTagName('*');
	var arr = [];
	for(var i = 0, length1 = oParent.length; i < length1; i++){
		if (oParent[i].className == box) {
			arr.push(oParent[i]);
		}
	}
	return arr;
}

function getMinIndex(arr,val) {
	for (var i in arr) {
		if (arr[i] == val) {
			return i;
		}
	}
}

//判断滚动条是否滑到低端
function checkscrollside() {
	var oParent = document.getElementById('main');
	var oBox = getClassObj(oParent,'box');
	var lastBoxH = oBox[oBox.length-1].offsetTop + Math.floor(oBox[oBox.length-1].offsetHeight/2);
	var documentH = document.body.clientHeight || document.documentElement.clientHeight;
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	// console.log(scrollTop);
	return (lastBoxH<(documentH+scrollTop))?true:false;
}