function Person (x,y) {
	var args = arguments;
	if (args.length === 1 && args[0] == true) {
		if (args[0].name) {
			this.name = args[0].name;
		};
		if (args[0].age) {
			this.age = args[0].age;
		};
	}else{
		if (args[0]) {
			this.name = args[0];
		};
		if (args[1]) {
			this.age = age;
		};
	}
}

Person.prototype.toString = function () {
	return 'name=' + this.name +'age=' + this.age;
}

var one = new Person('bosn',27);
	one.toString();


/*---------------------------------------------------------------------------------------------*/
function ClassName () {}
ClassName.prototype.addClass = function (str) {
	console.log('Class  ' + str + '  added');
	return this;//返回当前对象，所以可以进行链式调用
}
var manager = new ClassName();
	manager.addClass('classA').addClass('classB').addClass('classC');


/*--------------------------------------------------------------------------------------------*/
function getFun (n) {
	var number =1;
	while (n>1){
		number *= n;
		n--;
	}
	return number;
}

function getFun2 (n) {
	var i,number = 1;
	for (i=2;i<=n;i++){
		number *=i;
	}
	return number;
}

function Query (x,y) {
	this.x = x;
	this.y = y;
}
Query.prototype.r = function () {
	return Math.sqrt(
		this.x * this.x +
		this.y * this.y
		);	
}



function Foo() {

    getName = function () { alert (1); };

    return this;

}

Foo.getName = function () { alert (2);};

Foo.prototype.getName = function () { alert (3);};

var getName = function () { alert (4);};

function getName() { alert (5);}

//请写出以下输出结果：

Foo.getName();//2

getName();//4

Foo().getName();//1

getName();//1

new Foo.getName();//2

new Foo().getName();//3

new new Foo().getName();//3