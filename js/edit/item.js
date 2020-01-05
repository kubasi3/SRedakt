'use strict';
var Item = function(itemName, connectToParent, removeFromParent) {
    var self;
    var name;
    var dom;
    var properities;
    var childs;
    var appChild;
    var selfData;
    var text;
    var ul = false;
    var li;
    var liCounter = 0;

    var app = function(child, childLi) {
        self.appendChild(child);
        if (!ul) {
            ul = document.createElement('ul');
            ul.className = 'list-group';
            li.innerHTML = '<strong>' + li.innerHTML + '</strong>';
            li.appendChild(ul);
            li.onclick = function() {
                if (controler.canShow()) {
                    active();
                    controler.canShowFalse();
                    if (ul.className == 'list-group d-none') {ul.className = 'list-group'} else {ul.className = 'list-group d-none'};
                }
            }
        }
        liCounter++;
        ul.appendChild(childLi);
    }

    var rem = function(child, childLi) {
        self.removeChild(child); 
        active(); 
        controler.canActiveTrue(); 
        ul.removeChild(childLi);
        liCounter--;
        if (liCounter == 0) {
            li.innerHTML = selfData.nazev;
            li.onclick = function(){};
            ul = false;
        }
    }
    var remFP = function() {removeFromParent(self, li)};

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
        self.innerHTML = text;
        } else{text = ''};
    name = selfData['name'];
    createProperities();

    var active = function() {
        if(controler.canActive()) {
            var navName;
            if(name) {navName = name} else {navName = dom};
            navBar.change(navName, appChild, remFP, setProperity);
            controler.canActiveFalse();
        }
    }

    self.onclick = function() {active()};

    li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = selfData.nazev;
    li.onclick = function() {active(); controler.canShowFalse()};

    connectToParent(self, li);
}

var Body = function() {
    var self;
    var name;
    var properities = [];
    var childs = [];
    var appChild;
    var ul;
    var li;

    var app = function(child, childLi) {
        self.appendChild(child);
        ul.appendChild(childLi);
    }

    var rem = function(child, childLi) {self.removeChild(child); navBar.change(name, appChild); ul.removeChild(childLi)};

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

    ul = document.createElement('ul');
    ul.className = 'list-group';
    ul.onclick = function() {controler.canShowTrue(); controler.canActiveTrue()};
    document.getElementById('navBar').appendChild(ul);

    li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = 'Stránka';
    li.onclick = function() {
        if (controler.canActive()) {navBar.change(name, appChild)};
    }
    ul.appendChild(li);

    navBar.change(name, appChild);
}