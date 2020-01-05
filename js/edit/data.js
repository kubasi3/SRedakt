'use strict';
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