'use strict';
var Test = function() {
    this.test = 'lol';
    var test = 'lil';
    this.al = function(){
        alert(test);
    }
}

class Test2 extends Test {
    //test = 'lul';

    constructor() {
        super(test);
        //alert(test);
        this.test = 'test';
    }
    
}

//alert(Test2);
var test = new Test2();
//test.al();

var ahoj = function(text) {
    alert(text);
}

var zdravic = function(fun) {
    fun('ahoj');
}

//zdravic(ahoj);