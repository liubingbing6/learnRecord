window.appcan && appcan.define('jsonAndXml',function ($,exports,module) {

		function loadXMLDoc(dname)//从服务器读取xml文件内容
		{
			if (window.XMLHttpRequest)
			{
				xhttp=new XMLHttpRequest();
			}
			else
			{
				xhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
				xhttp.open("GET",dname,false);
				xhttp.send();
				return xhttp.responseXML;
		},
		function loadXMLString(txt) //判断xml格式字符串进行解析
		{
			if (window.DOMParser)
			{
				parser=new DOMParser();
				xmlDoc=parser.parseFromString(txt,"text/xml");
			}
			else // Internet Explorer
			{
				xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async=false;
				xmlDoc.loadXML(txt); 
			}
				return xmlDoc;
		},
		function judgeXMLorString(text) //判断传入的参数是xml文件还是字符串
		{
			if(/(\.xml)$/.test(text)){
				return loadXMLDoc(text);	
			}else{
				return loadXMLString(text);	
			}	
		},
		function changeLabel(html) //对生成的xml标签进行转译，使其可以显示在页面中
		{
			var str = html.innerHTML;
 			var str2 = "";
 			var level = 0;
 			for (i = 0; i < str.length; i++) 
 			{
				if (str[i] == "<") {
					if (str[i + 1] == "/")
					 {
						level--;
						for (j = 0; j < level; j++) 
						{
							str2 += "&nbsp;";
						}
					}else{
						for (j = 0; j < level; j++) 
						{
							str2 += "&nbsp;";
						}
						level++;
					}
					str2 += "&lt;";
					}
				else if (str[i] == ">") 
					{
						str2 += "&gt;";
					}
					else {
						str2 += str[i];
					}
			}
			return str2;
		},
		function xml2json(text)  //将xml格式的文件或字符串转换为json格式
		{
			var reg = /(\.xml)$/;
		  
		 if (reg.test(text))//对传入的xml文件做如下处理
		 {
				xmlDoc = loadXMLDoc(text);
				x = xmlDoc.documentElement.childNodes;
				var obj = {};
				for(var i=0;i<x.length;i++)
				{
					if(x[i].nodeType == 1 && x[i].nodeValue==null)
					{
						var len = x[i].childNodes.length;
						for(var j=0;j<len;j++)  //对第二级目录做处理
						{
							if(x[i].childNodes[j].nodeType ==1)
							{
								obj[x[i].childNodes[j].nodeName] = x[i].childNodes[j].childNodes[0].nodeValue
							}	
						}	
					}
						//xml文件除了根节点，只有一级目录，做如下处理
					if (x[i].nodeType == 1 && x[i].nodeValue==null && x[i].childNodes[0].nodeValue !=='\n')
					{
						obj[x[i].nodeName] = x[i].childNodes[0].nodeValue;	
					}
			}
				obj = JSON.stringify(obj);
				obj= JSON.parse(obj);

				return obj;	 

		 }else{//如果是xml字符串，做如下处理
				xmlDoc = loadXMLString(text);
				x = xmlDoc.documentElement.childNodes;
				var obj = {};
				for(var i=0;i<x.length;i++){
					obj[x[i].nodeName] = x[i].childNodes[0].nodeValue;
				}
				obj = JSON.stringify(obj);
				obj= JSON.parse(obj);

				return obj;
			}
		},
	 	function json2xml(obj)  //将json转换为xml格式
	 	{
	 		var obj  = JSON.parse(obj);
			var txt="<?xml version='1.0' encoding='utf-8'?><note></note>"; //定义一个根节点
			var xmlDoc = judgeXMLorString(txt); //解析为xml格式，方便做如下处理
			var x = xmlDoc.getElementsByTagName("note")[0];
			$.each(obj,function(i,v){	//遍历对象，生成相应节点
				 eleNode = xmlDoc.createElement(i);	
				 txtNode = xmlDoc.createTextNode(v);
				 eleNode.appendChild(txtNode);
				 x.appendChild(eleNode);
			});
			var xml = changeLabel(x); //对生成的xml进行标签的转译
			xml = '&lt;'+"?xml version=\'1.0\' encoding=\'utf-8\'?"+'&gt;'+"<br/>"+xml;
			return xml;
		},

	var jsonAndXml = module.exports = {
		xml2json : xml2json,
		json2xml : json2xml
	}
});