'use strict'
let Item;

Item = function(selfData) {
    //dom
    let main;
    let li;
    let head;
    let body;
    let nameForm;
    let nameText;
    let nameButton;
    let nameAlert;
    let removeButton;
    let bodyText;
    let bodyInput;
    let bodyButtonChangeText;
    let bodyInputChangeText;

    //proměnné
    let canChangeName = false;
    let timeout;
    let name = false;
    let text = false;
    let me = this;

    //vnitřní f-ce
    let controlName;
    let changeName;
    let changeText;
    let remove;

    //volatelné f-ce
    let getJson;

    //volatelné f-ce
    getJson = function() {
        let json = {
            name : nameText.innerHTML,
            nazev : selfData.nazev,
            input : selfData.input,
            type : selfData.type,
            text : text
        }
        return json;
    }

    //přiřazení volatelných f-cí
    this.getJson = getJson;

    //vnitřní f-ce
    controlName = function() {
        let control;

        control = function() {
            if (controler.controlName(nameForm.value)) {
                canChangeName = true;
                nameButton.className = 'btn btn-success';
            } else {
                canChangeName = false;
                nameButton.className = 'btn btn-success disabled';
                nameAlert.className = 'alert alert-danger';
                nameAlert.innerHTML = 'Tento název se již v tomto formuláři vyskytuje!';
            }
            
        }

        clearTimeout(timeout);
        li.innerHTML = selfData.nazev + ' : ' + nameForm.value;
        nameAlert.className = 'd-none';
        canChangeName = false;
        if (nameForm.value != '') {
            timeout = setTimeout(control, 500);
        } else {
            nameButton.className = 'btn btn-success disabled';
            nameAlert.className = 'alert alert-danger';
            nameAlert.innerHTML = 'Musíte zadat název!';
        }
        
    }

    changeName = function() {
        if (canChangeName) {
            nameButton.className = 'btn btn-info';
            nameButton.innerHTML = 'Změnit název';

            name = nameForm.value;
            nameText.innerHTML = nameForm.value;

            nameText.className = 'card-title';
            nameForm.className = 'd-none';

            nameButton.onclick = function() {
                name = false;
                nameButton.className = 'btn btn-success';
                nameButton.innerHTML = 'Změnit';

                nameText.className = 'd-none';
                nameForm.className = '';
                nameForm.value = nameText.innerHTML;
                nameButton.onclick = function() {
                    if (canChangeName) {
                        changeName();
                    }
                }
                canChangeName = true;
            }
        }
    }

    changeText = function() {
        bodyInputChangeText.value = bodyText.innerHTML;
        bodyInputChangeText.className = '';
        bodyText.className = 'd-none';
        bodyButtonChangeText.className = 'btn btn-success';
        bodyButtonChangeText.innerHTML = 'Hotovo';
        bodyButtonChangeText.onclick = function() {
            bodyText.innerHTML = bodyInputChangeText.value;
            text = bodyInputChangeText.value;
            bodyInputChangeText.className = 'd-none';
            bodyText.className = 'text-muted';
            bodyButtonChangeText.className = 'btn btn-info';
            bodyButtonChangeText.innerHTML = 'Upravit';
            bodyButtonChangeText.onclick = function() {
                changeText();
            }
        }
    }
    
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
    nameAlert = document.createElement('div');
    head.appendChild(nameAlert);

    nameForm = document.createElement('input');
    nameForm.className = '';
    nameForm.placeholder = 'Zadej název';
    nameForm.onkeyup = function() {
        controlName();
    }
    head.appendChild(nameForm);

    nameText = document.createElement('h4');
    nameText.className = 'd-none';
    head.appendChild(nameText);

    nameButton = document.createElement('button');
    nameButton.className = 'btn btn-success';
    nameButton.innerHTML = 'Potvrdit';
    nameButton.onclick = function() {
        if (canChangeName) {
            changeName();
        }
    }
    head.appendChild(nameButton);    

    removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger';
    removeButton.innerHTML = 'Odstranit';
    removeButton.onclick = function() {
        controler.remove(me);
    }    
    head.appendChild(removeButton);

    //body
    bodyText = document.createElement('span');
    bodyText.className = 'text-muted';
    bodyText.innerHTML = 'Informační text pro uživatele.';
    body.appendChild(bodyText);

    bodyInputChangeText = document.createElement('textArea');
    bodyInputChangeText.className = 'd-none';
    bodyInputChangeText.setAttribute('cols', 50);
    body.appendChild(bodyInputChangeText);

    bodyButtonChangeText = document.createElement('button');
    bodyButtonChangeText.className = 'btn btn-info';
    bodyButtonChangeText.innerHTML = 'Upravit';
    bodyButtonChangeText.onclick = function() {
        changeText();
    }
    body.appendChild(bodyButtonChangeText);

    body.appendChild(document.createElement('br'));
    bodyInput = document.createElement(selfData.input);
    body.appendChild(bodyInput);

    //načtení
    if (selfData.name) {
        nameForm.value = selfData.name;
        canChangeName = true;
        li.innerHTML = li.innerHTML + selfData.name;
        changeName();
    }
    if (selfData.text) {
        text = selfData.text;
        bodyText.innerHTML = selfData.text;
        bodyInputChangeText.value = selfData.text;
    }

    //přiřazení volatelných proměnných
    this.li = li;
    this.main = main;
    this.name = function() {return name};
}