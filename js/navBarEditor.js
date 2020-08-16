'use strict';

let NavBar;

NavBar = function() {
    //proměnné

    //dom
    let navUl = document.getElementById('navUl');
    let selfBar = document.getElementById('selfBar');
    let selfUl = document.getElementById('selfUl');
    let removeButton = document.getElementById('del');
    let saveButton = document.getElementById('btnSave');
    let moveUpButton = document.getElementById('btnMoveUp');
    let moveDownButton = document.getElementById('btnMoveDown');

    //f-ce
    let navBarChange;
    let selfBarChange;
    let change;

    //tvorba vrchního navigačního panelu
    navBarChange = function(myData) {
        while (0 < navUl.children.length) {
            navUl.removeChild(navUl.children[0]);
        }
        for (let i = 0; i < myData.length; i++) {
            let li;
            let a;
            let div;

            li = document.createElement('li');
            li.className = 'nav-item dropdown';

            a = document.createElement('a');
            a.className = 'nav-link dropdown-toggle';
            a.setAttribute('data-toggle', 'dropdown');
            a.textContent = myData[i].text;
            li.appendChild(a);

            div = document.createElement('div');
            div.className = 'dropdown-menu';
            for (let y in myData[i].items) {
                let a;

                a = document.createElement('a');
                a.className = 'dropdown-item';
                a.textContent = myData[i].items[y].text;
                a.onclick = function(){data.activeItem.appChild(myData[i].items[y])};
                div.appendChild(a);
            }
            li.appendChild(div);
            navUl.appendChild(li);
        }
    }

    selfBarChange = function(item) {
        let myData = item.selfData.selfBar;
        if (myData) {
            while (0 < selfUl.children.length) {
                selfUl.removeChild(selfUl.children[0]);
            }
            removeButton.onclick = function() {item.parent.remChild(item)};
            moveUpButton.onclick = function() {item.parent.moveChild(item, 'up')};
            moveDownButton.onclick = function() {item.parent.moveChild(item, 'down')};

            if (myData.properities) {
                for (const properity in myData.properities) {
                    selfUl.appendChild(data.properitiesFunc[myData.properities[properity].func](item,  myData.properities[properity], item.setProperity))
                }
            }
            selfBar.className = 'navbar navbar-expand-sm bg-primary navbar-primary';
        } else {selfBar.className = 'navbar navbar-expand-sm bg-primary navbar-primary d-none'};
    }

    change = function(item) {
        navBarChange(item.selfData.navBar);
        selfBarChange(item)
    }

    //tlačítka
    saveButton.onclick = function() {
        //proměnné
        let json;

        let finnish = function(text) {
            body.loadPage(JSON.parse(text));
        }

        let dat = body.child.getFT();
        json = body.child.save();
        json.nazev = body.nazev;
        json.forms = dat.forms;
        json.templates = dat.templates;
        json = JSON.stringify(json);
        data.func.xhttp(finnish, '/SRedakt/PHP/control.php', '2JSON=' + json + '&id=' + globalid + '&table=' + globaltable);
    }

    this.change = change;
}