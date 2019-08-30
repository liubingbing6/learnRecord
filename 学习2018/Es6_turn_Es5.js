// JavaScript Document
 class Calc {
    constructor() {
      console.log('Calc constructor');
    }
    add(a, b) {
      return a + b;
    }
	add2(){
		let name = "Bob", time = "today";
		return `Hello ${name}, how are you ${time}?`;
}
  }

  var c = new Calc();
  console.log(c.add2());