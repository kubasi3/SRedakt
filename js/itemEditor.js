'use strict'
let Item;
let Body;
let Template;

Item = function(selfData, parent) {
    //f-ce
    let appChild;
    let createProperities;
    let connectChild;
    let active;
    let remChild;
    
    //volatelné f-ce
    let setProperity;
    let loadPage;
    let save;
    let moveChild;
    let setSpecialProperity;
    let addForm;
    let getFT;

    //proměnné
    let childs = [];
    let self = this;
    let properities = {};
    let specialProperities = {};
    let me = this;
    let ul;
    let li;
    let id;
    let form = false;

    //vnitřní f-ce
    createProperities = function() {
        self.className = '';
        for (const properity in properities) {
            self.className += ' ' + properities[properity];
        }
        for (const properity in specialProperities) {
            self.setAttribute(properity, specialProperities[properity]);
        }
    }

    active = function() {
        if (data.controler.canActive()) {
            data.activeItem.li.className = 'list-group-item';
            data.activeItem = me;
            navBar.change(me);
            data.controler.canActiveFalse();
            li.className = 'list-group-item list-group-item-success';
        }
    }

    //z vnějšku volatelné f-ce
    appChild = function(data, template=false) {
            if (template) {
                childs[childs.length] = new Template(data, me);
            } else { 
                childs[childs.length] = new Item(data, me);
            }    }

    connectChild = function(child, childLi) {
        self.appendChild(child);
        //boční navigace
        if (!ul) {
            ul = document.createElement('ul');
            ul.className = 'list-group';
            li.innerHTML  = '<strong>' + li.innerHTML + '</strong>';
            li.appendChild(ul);
            li.onclick = function() {
                if (data.controler.canShow()) {
                    active();
                    data.controler.canShowFalse();
                    if (ul.className == 'list-group d-none') {ul.className = 'list-group'} else {ul.className = 'list-group d-none'}; 
                }  
            }
        }
        ul.appendChild(childLi);
    }

    remChild = function(child) {
        self.removeChild(child.self); 
        active(); 
        data.controler.canActiveTrue(); 
        ul.removeChild(child.li);
        if (ul.children.length == 0) {
            li.innerHTML = selfData.text;
            li.onclick = function(){active()};
            ul = false;
        }
        for (let i = 0; i < childs.length; i++) {
            if (childs[i] == child) {
                delete childs[i];
                for (let l = i + 1; l < childs.length; l++) {
                    childs[l - 1] = childs[l];
                }
                childs.pop();
                break;
            }
        }

    }

    setProperity = function(nameProperity, properity) {
        if (properities.hasOwnProperty(nameProperity)){
            properities[nameProperity] = properity;
            createProperities();
        } else {
            properities[nameProperity] = properity;
            self.className += ' ' + properity;
        }
    }

    setSpecialProperity = function(nameProperity, properity) {
        if (specialProperities.hasOwnProperty(nameProperity)){
            specialProperities[nameProperity] = properity;
            createProperities();
        } else {
            specialProperities[nameProperity] = properity;
            self.setAttribute(nameProperity, properity);
        }
    }

    loadPage = function (json) {
        let properities = json.properities;
        for (const properity in properities) {
            setProperity(properity, properities[properity]);
        }
        let specialProperities = json.specialProperities;
        for (const properity in specialProperities) {
            setSpecialProperity(properity, specialProperities[properity]);
        }
        self.innerHTML = json.html;
        for (let i = 0; i < json.childs.length; i++) {
            const child = json.childs[i];
            if (child.type == 'item') {
                appChild(data.item[child.way1].items[child.way2]);
                childs[i].loadPage(child);
            } else if (child.type == 'template') {
                appChild(child.id, true);
            }
        }
        if(json.hasOwnProperty('form')) {form = json.form};
    }

    save = function() {
        let jChilds = [];
        while (0 < childs.length) {
            jChilds[jChilds.length] = childs[0].save();
            remChild(childs[0]);
        }
        let json = {
            childs : jChilds,
            way1 : selfData.way1,
            way2 : selfData.way2,
            html : self.innerHTML,
            dom : selfData.dom,
            type : 'item',
            properities : properities,
            specialProperities : specialProperities
        }
        if (form) {
            json.form = form;
        }
        return json;
    }

    moveChild = function(child, smer) {
        for (let i = 0; i < childs.length; i++) {
            if (child == childs[i]) {
                if (smer == 'up' && childs[i - 1]) {
                    let helpChild;
                    //posun na stránce
                    self.insertBefore(childs[i].self, childs[i-1].self);

                    //posun v menu
                    ul.insertBefore(childs[i].li, childs[i-1].li);

                    //přeřazení seznamu
                    helpChild = childs[i];
                    childs[i] = childs[i - 1];
                    childs[i - 1] = helpChild;
                } else if (smer == 'down' && childs[i + 1]) {
                    let helpChild;
                    //posun na stránce
                    self.insertBefore(childs[i + 1].self, childs[i].self);

                    //posun v menu
                    ul.insertBefore(childs[i + 1].li, childs[i].li);

                    //přeřazení seznamu
                    helpChild = childs[i];
                    childs[i] = childs[i + 1];
                    childs[i + 1] = helpChild;
                }
                break;
            }
        }
    }

    addForm = function(id, nazev) {
        form = {
            id : id,
            nazev : nazev
        }
    }

    getFT = function() {
        let dat = {
            forms: [],
            templates: []
        };
        for (let i = 0; i < childs.length; i++) {
            let childDat = childs[i].getFT();
            //předání forms
            for (let l = 0; l < childDat.forms.length; l++) {
                let addForm = true;
                for (let x = 0; x < dat.forms.length; x++) {
                    if (dat.forms[x] == childDat.forms[l]) {
                        addForm = false;
                        break;
                    }
                }
                if (addForm) {
                    dat.forms[dat.forms.length] = childDat.forms[l];
                }
            }
            //předání templates
            for (let l = 0; l < childDat.templates.length; l++) {
                let addTemplate = true;
                for (let x = 0; x < dat.templates.length; x++) {
                    if (dat.templates[x] == childDat.templates[l]) {
                        addTemplate = false;
                        break;
                    }
                }
                if (addTemplate) {
                    dat.templates[dat.templates.length] = childDat.templates[l];
                }
            }
        }
        if(form) {
            dat.forms[dat.forms.length] = form;
        }
        return dat;
    }

    //přiřazení z vnějšku volatelných f-cí
    this.appChild = appChild;
    this.connectChild = connectChild;
    this.remChild = remChild;
    this.setProperity = setProperity;
    this.loadPage = loadPage;
    this.save = save;
    this.moveChild = moveChild;
    this.addForm = addForm;
    this.getFT = getFT;
    this.setSpecialProperity = setSpecialProperity;
    this.properities = properities;

    //program
    self = document.createElement(selfData.dom);
    if (selfData.defItem) {
        if (selfData.defItem.hasOwnProperty('text')) {self.innerHTML = selfData.defItem.text};
        if (selfData.defItem.hasOwnProperty('childs')) {childs = selfData.defItem.childs} else {childs = []};
        properities = Object.assign({}, selfData.defItem.properities);
    }
    else {
        
        self.innerHTML = selfData.html;
        
    }
    createProperities();
    self.onclick = function() {active()};

    //boční navigace
    li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = selfData.text;
    li.onclick = function() {active(); data.controler.canShowFalse()};

    parent.connectChild(self, li);

    //přiřazení proměnných
    this.selfData = selfData;
    this.parent = parent;
    this.self = self;
    this.li = li;
    this.id = id;
}

Body = function() {
    //f-ce
    let appChild;
    let connectChild;

    //proměnné
    let ul;
    let child;
    let nazev;
    let form = [];

    let self = document.getElementById('body');

    appChild = function(self) {
        child = new Item(self, body);
        this.child = child;
    }

    connectChild = function(child, childLi) {
        self.appendChild(child);
        ul.appendChild(childLi);
    } 

    this.appChild = appChild;
    this.connectChild = connectChild;
    this.nazev = nazev;
    this.form = form;

    ul = document.createElement('ul');
    ul.className = 'list-group';
    document.getElementById('navBar').appendChild(ul);
    ul.onclick = function() {
        data.controler.canActiveTrue();
        data.controler.canShowTrue();
    }

    self.onclick = function() {data.controler.canActiveTrue()};

    this.loadPage = function(json) {
        if (json != null) {
            child.loadPage(json);
        }
    }
}

Template = function(id, parent) {
    //vnitřní f-ce
    let xhttpFinnish;
    let active

    //třídy
    let Child;
    let MyTemplate;

    //proměnné
    let childs = [];
    let me = this;
    let li;
    let selfData = {};
    let self;

    //vnější f-ce
    let connectChild;
    let save;
    let getFT;

    //vnější f-ce
    connectChild = function(child) {
        self.appendChild(child);
    }

    save = function() {
        return {type : 'template', id : id};
    }

    getFT = function() {
        let dat = {
            forms: [],
            templates: []
        };
        if(selfData.forms) {
            dat.forms = selfData.forms;
        }
        if(selfData.templates) {
            dat.templates = selfData.templates;
        }
        dat.templates[dat.templates.length] = id;
        return dat;
    }

    //přiřazení vnějších f-cí
    this.connectChild = connectChild;
    this.save = save;
    this.getFT = getFT;

    //vnitřní f-ce
    xhttpFinnish = function(text) {
        selfData = JSON.parse(text);
        li.innerHTML = selfData.nazev;
        for (let i = 0; i < selfData.childs.length; i++) {
            const child = selfData.childs[i];
            if (child.type == 'item') {
                childs[childs.length] = new Child(child, me);
            } else if (child.type == 'template') {
                childs[childs.length] = new MyTemplate(child.id, me);
            } else {
                childs[childs.length] = new Child(child, me);
            }
            childs[childs.length - 1].createChilds();
        }
    }

    active = function() {
        if (data.controler.canActive()) {
            data.activeItem.li.className = 'list-group-item';
            data.activeItem = me;
            navBar.change(me);
            data.controler.canActiveFalse();
            li.className = 'list-group-item list-group-item-success';
        }
    }

    //objekty
    Child = function(selfData, parent) {
        //proměnné
        let self;
        let childs = [];
        let me = this;

        //vnitřní f-ce
        let createProperities

        //vnější f-ce
        let connectChild;
        let createChilds;

        //Vnitřní f-ce
        createProperities = function() {
            self.className = '';
            for (const properity in selfData.properities) {
                self.className += ' ' + selfData.properities[properity];
            }
        }

        //vnější f-ce
        connectChild = function(child) {
            self.appendChild(child);
        }
        
        createChilds = function() {
            for (let i = 0; i < selfData.childs.length; i++) {
                const child = selfData.childs[i];
                if (child.type == 'item') {
                    childs[childs.length] = new Child(child, me);
                } else if (child.type == 'template') {
                    childs[childs.length] = new Template(child.id, me, true);
                } else {
                    childs[childs.length] = new Child(child, me);
                }
                childs[childs.length - 1].createChilds();
            }
        }

        //přiřazení vnějších f-cí
        this.connectChild = connectChild;
        this.createChilds = createChilds;

        //program
        self = document.createElement(selfData.dom);
        self.innerHTML = selfData.html;

        createProperities();
        parent.connectChild(self)
        }

    MyTemplate = function(id, parent) {
        //vnější f-ce
        let connectChild;
        let createChilds;

        //vnitřní f-ce
        let xhttpFinnishIn;

        //proměnné
        let childs = [];
        let me = this;
        let self;
        let selfData

        //vnitřní f-ce
        xhttpFinnishIn = function(text) {
            selfData = JSON.parse(text);
            for (let i = 0; i < selfData.childs.length; i++) {
                const child = selfData.childs[i];
                if (child.type == 'item') {
                    childs[childs.length] = new Child(child, me);
                } else if (child.type == 'template') {
                    childs[childs.length] = new MyTemplate(child.id, me);
                } else {
                    childs[childs.length] = new Child(child, me);
                }
                childs[childs.length - 1].createChilds();
            }
        }

        //vnější f-ce
        connectChild = function(child) {
            self.appendChild(child);
        }

        createChilds = function() {
            data.func.xhttp(xhttpFinnishIn, '/SRedakt/PHP/control.php', 'load2=' + id + '&table=2');
        }

        //přiřazení vnějších f-cí
        this.createChilds = createChilds;
        this.connectChild = connectChild;

        //program
        self = document.createElement('div');
        parent.connectChild(self)
    }

    //program

    self = document.createElement('div');
    self.onclick = function() {active()};

    //boční navigace
    li = document.createElement('li');
    li.className = 'list-group-item';
    li.onclick = function() {active(); data.controler.canShowFalse()};

    parent.connectChild(self, li);
    
    data.func.xhttp(xhttpFinnish, '/SRedakt/PHP/control.php', 'load2=' + id + '&table=2');

    //definice selfData
    selfData.navBar = {};
    selfData.selfBar = {};

    //z vnějšku volatelné proměnné p5iřazení
    this.selfData = selfData;
    this.li = li;
    this.self = self;
    this.parent = parent;
}