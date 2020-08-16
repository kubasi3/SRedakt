'use strict'
let Controler;

let controler;
let data;

Controler = function() {
    //dom
    let body = document.getElementById('body');

    //proměnné
    let childs = [];
    let json;

    let func = function(text) {
        if (text == true) {
            location.reload();
        }
    }

    this.send = function() {
        let json = {};
        for (let i = 0; i < childs.length; i++) {
            let child = childs[i];
            json[child.name] = child.input.value;
        }

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {if (this.readyState == 4 && this.status == 200) {func(this.responseText)}};
        xhttp.open('POST', '/SRedakt/PHP/control.php', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send('saveForm=' + globalId + '&sfJSON=' + JSON.stringify(json));

        
    }

    if(load) {
        json = load();
        for (let i = 0; i < json.childs.length; i++) {
            const child = json.childs[i];
            childs[childs.length] = new Item(child);
            body.appendChild(childs[childs.length - 1].main);
            body.appendChild(document.createElement('br'));
        }
    }
}

let Item;

Item = function(selfData) {
    //dom
    let main;
    let li;
    let head;
    let body;
    let nameText;
    let bodyText;
    let bodyInput;

    //Základní struktura
    main = document.createElement('div');
    main.className = 'card';

    li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = selfData.nazev + ' : ';

    head = document.createElement('div');
    head.className = 'card-header';
    main.appendChild(head);

    body = document.createElement('div');
    body.className = 'card-body';
    main.appendChild(body);

    //head
    nameText = document.createElement('h4');
    nameText.className = 'card-title';
    if (selfData.name) {
        this.name = selfData.name;
        nameText.innerHTML = selfData.name;
    } else {
        this.name = false;
    }
    head.appendChild(nameText);

    //body
    bodyText = document.createElement('span');
    bodyText.className = 'text-muted';
    if (selfData.text) {
        bodyText.innerHTML = selfData.text;
    }
    body.appendChild(bodyText);

    body.appendChild(document.createElement('br'));
    bodyInput = document.createElement(selfData.input);
    body.appendChild(bodyInput);

    //přiřazení volatelných proměnných
    this.main = main;
    this.input = bodyInput;
}

window.onload = function() {
    controler = new Controler();
}