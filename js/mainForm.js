'use strict'
let Controler;

let controler;
let data;

Controler = function() {
    //dom
    let body = document.getElementById('body');
    let sideBar = document.getElementById('sideBar');
    let saveButton = document.getElementById('btnSave');

    //proměnné
    let childs = [];
    let json;

    //volatelné f-ce
    let create;
    let controlName;
    let remove;

    //vnitřní f-ce
    let save;

    //vnitřní f-ce
    save = function() {
        //proměnné
        let canSave = true;
        let jsonChilds = [];
        let json = {};

        //f-ce
        let finnish

        //f-ce
        finnish = function(text) {
        }

        for (let i = 0; i < childs.length; i++) {
            if (!childs[i].name()) {
                canSave = false;
                break;
            }
        }
        if (canSave) {
            for (let i = 0; i < childs.length; i++) {
                jsonChilds[jsonChilds.length] = childs[i].getJson();
            }
            json.childs = jsonChilds;
            json = JSON.stringify(json);
            data.func.xhttp(finnish, '/SRedakt/PHP/control.php', '2JSON=' + json + '&id=' + globalId + '&table=4');
        } else {
            alert('Všechny prvky ve formuláři musí mít název!');
        }
    }

    //volatelné f-ce
    create = function(type) {
        //proměnné

        childs[childs.length] = new Item(data.item[type]);
        body.appendChild(childs[childs.length - 1].main);
        body.appendChild(document.createElement('br'));
        sideBar.appendChild(childs[childs.length - 1].li);
    }

    controlName = function(name) {
        for (let i = 0; i < childs.length; i++) {
            const child = childs[i];
            if (child.name() == name) {
                return false;
            } 
        }
        return true;
    }

    remove = function(child) {
        for (let i = 0; i < childs.length; i++) {
            if (child == childs[i]) {
                body.removeChild(childs[i].main);
                body.removeChild(body.children[2 * i]);
                sideBar.removeChild(childs[i].li);
                for (let l = i; l < childs.length - 1; l++) {
                    childs[l] = childs[l + 1];
                }
                childs.pop();
                break;
            }
            
        }
    }

    //přiřazen volatelných f-cí
    this.create = create;
    this.controlName = controlName;
    this.remove = remove;

    saveButton.onclick = function() {save()};

    if(load) {
        json = load();
        if(json.childs) {
            for (let i = 0; i < json.childs.length; i++) {
                const child = json.childs[i];
                childs[childs.length] = new Item(child);
                body.appendChild(childs[childs.length - 1].main);
                body.appendChild(document.createElement('br'));
                sideBar.appendChild(childs[childs.length - 1].li);
            }
        }
    }
}

window.onload = function() {
    controler = new Controler();
    data = new Data();
}