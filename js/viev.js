'use strict'
let Item;
let Body;
let Template;

Item = function(json, parent) {
    //f-ce
    let appChild;
    let connectChild;

    
    //volatelné f-ce
    let setProperity;
    let loadPage;
    let setSpecialProperity;

    //proměnné
    let childs = [];
    let self = this;
    let properities = {};
    let specialProperities = {};
    let me = this;
    let id;

    //vnitřní f-ce

    //z vnějšku volatelné f-ce
    appChild = function(data) { 
            childs[childs.length] = new Item(data, me);
        }

    connectChild = function(child) {
        self.appendChild(child);
    }

    setProperity = function(nameProperity, properity) {
        properities[nameProperity] = properity;
        self.className += ' ' + properity;
    }

    setSpecialProperity = function(nameProperity, properity) {
        specialProperities[nameProperity] = properity;
        self.setAttribute(nameProperity, properity);
    }

    //přiřazení z vnějšku volatelných f-cí
    this.appChild = appChild;
    this.connectChild = connectChild;
    this.setProperity = setProperity;
    this.loadPage = loadPage;

    //program
    self = document.createElement(json.dom);
    self.innerHTML = json.html;

    parent.connectChild(self);

    properities = json.properities;
    for (const properity in properities) {
        setProperity(properity, properities[properity]);
    }
    specialProperities = json.specialProperities;
    for (const properity in specialProperities) {
        setSpecialProperity(properity, specialProperities[properity]);
    }
    self.innerHTML = json.html;
    for (let i = 0; i < json.childs.length; i++) {
        const child = json.childs[i];
        if (child.type == 'item') {
            appChild(child);
        } else if (child.type == 'template') {
            for (let l = 0; l < globalJson.templates.length; l++) {
                const template = globalJson.templates[l];
                if (child.id == template.id) {
                    appChild(JSON.parse(template.json));
                    break;
                }
                
            }
        }
    }
    if(json.hasOwnProperty('form')) {
        for (let i = 0; i < globalJson.forms.length; i++) {
            if (globalJson.forms[i].form == json.form.id) {
                self.innerHTML = globalJson.forms[i].json[json.form.nazev];
                break;
            } 
        }
    };

    //přiřazení proměnných
    this.parent = parent;
    this.self = self;
    this.id = id;
}

Body = function(json) {
    //f-ce
    let appChild;
    let connectChild;

    //proměnné
    let child;
    let nazev;
    let form = [];

    let self = document.getElementsByTagName('body')[0];

    appChild = function(self) {
        child = new Item(json, body);
        this.child = child;
    }

    connectChild = function(child) {
        self.appendChild(child);
    } 

    this.appChild = appChild;
    this.connectChild = connectChild;
    this.nazev = nazev;
    this.form = form;
}

let body;
let globalJson;

window.onload = function() {
    globalJson = json;
    body = new Body(json);
    body.appChild(json);
}