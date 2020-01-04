'use strict';
var data;
var navBar;
var body;
var controler;


var Data = function() {
    var navDefault = [
        ['Zakladní', 'default'],
        ['Řádek', 'row'],
        ['Sloupec', 'col']
    ]
    var navTexts = [
        ['Text', 'text'],
        ['Nadpis 1', 'h1'],
        ['Odstavec', 'p']
    ]
    var navAlerts = [
        ['Upozornění', 'alerts'],
        ['Upozornění', 'alert']
    ]
    var navBar = {
        body : [navDefault, navTexts, navAlerts],
        alert : [navTexts, navAlerts]
    }
    var defItems = {
        alert : {
            name : 'alert',
            dom : 'div',
            properities : {
                color : 'alert-success'
            },
        },
        col : {
            name : 'col',
            dom : 'div',
        },
        row : {
            name : 'row',
            dom : 'div',
        },
        p : {
            dom : 'p',
            text : 'Textový odstavec.'
        },
        h1 : {
            dom : 'h1',
            text : 'Nadpis 1'
        }
    }

    this.defItem = function(id) {return defItems[id]};
    this.navBar = function(id){return navBar[id]};
}

var Properities = function() {
    var editProperitie = function() {

    }

}

var Item = function(itemName, connectToParent, removeFromParent) {
    var self;
    var name;
    var dom;
    var properities;
    var childs;
    var appChild;
    var selfData;
    var text;

    var app = function(child) {self.appendChild(child)};

    var rem = function(child) {self.removeChild(child)};

    var createProperities = function() {
        self.className = name;
        for (const properity in properities) {
            if (properities.hasOwnProperty(properity)) {
                self.className += ' ' + properities[properity];
                
            }
        }
    }

    var setProperity = function(nameProperity, properity) {
        if (properities.hasOwnProperty(nameProperity)){
            properities[nameProperity] = properity;
            createProperities();
        } else {
            properities[nameProperity] = properity;
            self.className += ' ' + properity;
        }
    }

    appChild = function(name) {
        childs[childs.length] = new Item(name, app, rem);
    }

    selfData = data.defItem(itemName);
    dom = selfData.dom;
    self = document.createElement(dom);

    if(selfData.hasOwnProperty('name')) {name = selfData.name} else{name = ''};
    if(selfData.hasOwnProperty('properities')) {properities = selfData.properities} else{properities = {}};
    if(selfData.hasOwnProperty('childs')) {childs = selfData.childs} else{childs = []};
    if(selfData.hasOwnProperty('text')) {
        text = selfData.text;
        self.textContent = text;
        } else{text = ''};
    name = selfData['name'];
    createProperities();

    self.onclick = function() {
        if(controler.canActive()) {
            if(name) {var navName = name} else {navName = dom};
            navBar.change(navName, appChild);
            controler.canActiveFalse();
        }
    }

    connectToParent(self);
}

var Body = function() {
    var self;
    var name;
    var properities = [];
    var childs = [];
    var appChild;

    var app = function(child) {self.appendChild(child)};

    var rem = function(child) {self.removeChild(child)};

    var createProperities = function() {
        self.className = name;
        for (let i = 0; i < properities.length; i++) {
            const properity = properities[i];
            self.className += ' ' + properity;
        }
    }

    var setProperity = function(nameProperity, properity) {
        if (properities[nameProperity]){
            properities[nameProperity] = properity;
            createProperities();
        } else {
            properities[nameProperity] = properity;
            self.className += ' ' + properity;
        }
    }

    appChild = function(name) {
        childs[childs.length] = new Item(name, app, rem);
    }

    name = 'body';
    self = document.getElementById('body');
    

    self.onclick = function() {
        if(controler.canActive()) {
            navBar.change(name, appChild);
        } else {controler.canActiveTrue()}
    }

    navBar.change(name, appChild);
}

var Controler = function() {
    var canActive = true;

    this.canActive = function() {return canActive};
    this.canActiveTrue = function() {canActive = true};
    this.canActiveFalse = function() {canActive = false};
}   

var NavBar = function() {
    var navUl;
    var navBar;

    this.change = function(idData, fun) {
        var dat;
        dat = data.navBar(idData);

        navBar.removeChild(navUl);
        navUl = document.createElement('ul');
        navUl.className = 'navbar-nav';
        for (let i = 0; i < dat.length; i++) {
            const element = dat[i];
            var navLi;
            var navA;
            var navDiv;


            navLi = document.createElement('li');
            navLi.className = 'nav-item dropdown';

            navA = document.createElement('a');
            navA.className = 'nav-link dropdown-toggle';
            navA.setAttribute('data-toggle', 'dropdown');
            navA.textContent = element[0][0];
            navLi.appendChild(navA);

            navDiv = document.createElement('div');
            navDiv.className = 'dropdown-menu';
            for (let l = 1; l < element.length; l++) {
                var navA;
                var create;

                navA = document.createElement('a');
                navA.className = 'dropdown-item';
                navA.textContent = element[l][0];
                navA.onclick = function(){fun(element[l][1])};
                navDiv.appendChild(navA);
            }
            navLi.appendChild(navDiv);
            navUl.appendChild(navLi);
        }
        navBar.appendChild(navUl);

    }
    navUl = document.createElement('ul');
    navBar = document.createElement('nav');
    navBar.className = 'navbar navbar-expand-sm bg-dark navbar-dark';  
    navBar.appendChild(navUl); 
    document.getElementById('editPanel').appendChild(navBar);
}

window.onload = function(){
    data = new Data();
    controler = new Controler(); 
    navBar = new NavBar();
    body = new Body();

    //alert(data.navBar('body'));

}