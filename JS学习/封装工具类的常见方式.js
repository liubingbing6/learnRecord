function Person() {
	var man = new Object();
	man.name = 'xiaoming';
	man.age = 24;
	man.cry = function () {
		console.log('man is good');
	}
	return man;
}
var man = Person();
man.cry();
// -----------------------------------------------
function Person(name,age) {
	var man = new Object();
	man.name = name;
	man.age = age;
	man.cry = function () {
		console.log('man is good');
	}
	return man;
}
var man = Person('xiaomng',24);
man.cry();
/*工厂模式*/

function Person(name,age) {
	this.name = name;
	this.age = age;
	this.showColor = function () {
		console.log(this.name);
	}
}
var woman = new Person('xiaoming',24);
	woman.showColor();
/*构造函数模式*/

function Person(name,age) {
	this.name = name;
	this.age = age;
	this.arr = new Array('a','b');
}
Person.prototype.showColor = function () {
	console.log(this.name);
}
/*混合构造函数模型*/

function Person(name,age) {
	this.name = name;
	this.age = age;
	if(typeof Person.run == 'undefined'){
		Person.prototype.showColor = function () {
			console.log(this.name);
		}
		Person.run = true;
	}

}
/*动态原型模式*/

