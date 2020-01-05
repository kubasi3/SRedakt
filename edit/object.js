'use strict';
var data;
var navBar;
var body;
var controler;
var dataProperities;


var Data = function() {
    var navs = {
        navDefault : [
            ['Základní', 'default'],
            ['Řádek', 'row'],
            ['Sloupec', 'col']
        ],
        navTexts : [
            ['Text', 'text'],
            ['Nadpis 1', 'h1'],
            ['Odstavec', 'p'],
            ['HTML text', 'span'],
        ],
        navAlerts : [
            ['Upozornění', 'alerts'],
            ['Upozornění', 'alert']
        ]
    }

    var properities = {
        colors : {
            navColors : {
                text : 'Styl',
                name : 'color',
                textProperity : ['Základní', 'Potvrzení', 'Informace', 'Varování', 'Nebezpečí', 'Šedý', 'Tmavý', 'Světlý'],
                valueProperity : ['alert-primary', 'alert-success', 'alert-info', 'alert-warning', 'alert-danger', 'alert-secondary', 'alert-dark', 'alert-light'],
            }
        }
    }

    var navBar = {
        body : [navs.navDefault, navs.navTexts, navs.navAlerts],
        alert : [navs.navTexts, navs.navAlerts],
        row : [[['Základní', 'default'], ['Sloupec', 'col']], navs.navTexts, navs.navAlerts],
        col : [[['Základní', 'default'], ['Řádek', 'row']], navs.navTexts, navs.navAlerts],
        h1 : [],
        p : [],
        span : [],
    }
    var selfBar = {
        alert : {
            properities : [
                ['color', 'select'],
            ],
            color : properities.colors.navColors
        },
        row : [],
        col : [],
        h1 : [],
        p : []
    }
    var defItems = {
        alert : {
            nazev : 'Upozornění',
            name : 'alert',
            dom : 'div',
            properities : {
                color : 'alert-primary',
            },
        },
        col : {
            nazev : 'Sloupec',
            name : 'col',
            dom : 'div',
            text : '<br><br>',
            properities : {
                border : 'border',
                borderColor : 'border-primary'
            },
        },
        row : {
            nazev : 'Řádek',
            name : 'row',
            dom : 'div',
            text : '<br><br>',
            properities : {
                border : 'border',
                borderColor : 'border-primary'
            },
        },
        p : {
            nazev : 'Textový odstavec',
            dom : 'p',
            text : 'Textový odstavec.'
        },
        h1 : {
            nazev : 'Nadpis 1',
            dom : 'h1',
            text : 'Nadpis 1'
        },
        span : {
            nazev : 'HTML text',
            dom : 'span',
            text : 'text',
        },
    }

    this.selfBar = function(id){if(selfBar[id]){return selfBar[id]} else{return false}};
    this.defItem = function(id){return defItems[id]};
    this.navBar = function(id){return navBar[id]};
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

var Controler = function() {
    var canActive = true;
    this.canActive = function() {return canActive};
    this.canActiveTrue = function() {canActive = true};
    this.canActiveFalse = function() {canActive = false};

    var canShow = true;
    this.canShow = function() {return canShow};
    this.canShowTrue = function() {canShow = true};
    this.canShowFalse = function() {canShow = false};
}   

var DataProperities = function() {
    var select = function(info, setProperity) {
        var dropdownDiv;
        var nameButton;
        var menuDiv;

        dropdownDiv = document.createElement('div');
        dropdownDiv.className = 'dropdown';
        dropdownDiv.textContent = info.text;

        nameButton = document.createElement('button');
        nameButton.className = 'btn dropdown-toggle';
        nameButton.setAttribute('data-toggle', 'dropdown');
        dropdownDiv.appendChild(nameButton);

        menuDiv = document.createElement('div');
        menuDiv.className = 'dropdown-menu';
        for (let i = 0; i < info.textProperity.length; i++) {
            var a;
            a = document.createElement('a');
            a.className = 'dropdown-item';
            a.textContent = info.textProperity[i];
            a.onclick = function() {setProperity(info.name, info.valueProperity[i])}
            menuDiv.appendChild(a);
        }
        dropdownDiv.appendChild(menuDiv);
        return dropdownDiv;
    }

    this.select = function(info, setProperity){return select(info, setProperity)};
}

var NavBar = function() {
    var navUl;
    var navBar;
    var selfBar;
    var selfUl;
    var removeButton;
    var editPanel;

    var navBarChange = function(idData, fun) {
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

    var selfBarChange = function(idData, rem, setProperity) {
        var dat;
        dat = data.selfBar(idData);

        if (dat) {
            selfBar.removeChild(selfUl);
            selfUl = document.createElement('ul');
            selfUl.className = 'navbar-nav';
            
            removeButton.onclick = function() {rem()};
            selfUl.appendChild(removeButton);

            if (dat.properities) {
                for (let i = 0; i < dat.properities.length; i++) {
                    const properity = dat.properities[i];
                    switch (properity[1]) {
                        case 'select':
                            selfUl.appendChild(dataProperities.select(dat[properity[0]], setProperity));
                            break;
                    
                        default:
                            break;
                    }
                }
            }

            selfBar.appendChild(selfUl);
            selfBar.className = 'navbar navbar-expand-sm bg-primary navbar-primary';
        } else {selfBar.className = 'navbar navbar-expand-sm bg-primary navbar-primary d-none'};
    }

    this.change = function(idData, app, rem, setProperity) {

        navBarChange(idData, app);
        selfBarChange(idData, rem, setProperity);
    }

    editPanel = document.getElementById('editPanel');

    navUl = document.createElement('ul');
    navBar = document.createElement('nav');
    navBar.className = 'navbar navbar-expand-sm bg-dark navbar-dark';  
    navBar.appendChild(navUl); 
    editPanel.appendChild(navBar);

    selfUl = document.createElement('ul');
    selfBar = document.createElement('nav');
    selfBar.className = 'navbar navbar-expand-sm bg-primary navbar-primary d-none';
    selfBar.appendChild(selfUl);  
    editPanel.appendChild(selfBar);  

    removeButton = document.createElement('button');
    removeButton.className = ' btn btn-danger';
    removeButton.textContent = 'Odstranit';
}

window.onload = function(){
    data = new Data();
    controler = new Controler(); 
    navBar = new NavBar();
    body = new Body();
    dataProperities = new DataProperities();

    //alert(data.navBar('body'));

}