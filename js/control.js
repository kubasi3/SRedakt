'use strict'
let control;

let Control = function() {
    //proměnné
    //f-ce
    let xhttp;
    let publicConfirm;
    let unpublic;
    //data
    let data = {};
    let me = this;

    xhttp = function(func, file, data) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {if (this.readyState == 4 && this.status == 200) {func(this.responseText)}};
        xhttp.open('POST', file, true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(data);
    };

    //set Funkce
    this.setId = function (id) {
        data.id = id;
    }

    this.setIdFolder = function (id) {
        data.idFolder = id;
    }

    this.setType = function (type) {
        data.type = type;
    }

    //tvorba prvku
    this.controlName = function (idName) {
        let func;
        let test;
        //data
        let adresar = ['', '', '&kategorie=' + data.idFolder, '&adresar=' + data.idFolder, ''];

        func = function(text) {
            let alert = document.getElementById(idName + 'Warning');
            let btn = document.getElementById(idName + 'Success');
            if (text >= 1) {
                alert.className = 'alert alert-danger';
                btn.className = 'btn btn-success disabled';
                btn.setAttribute('data-dismiss', '');
                data.canCreate = false;
            } else if (text == 0) {
                alert.className = 'alert alert-danger d-none';
                btn.className = 'btn btn-success';
                btn.setAttribute('data-dismiss', 'modal');
                data.canCreate = true;
            }
        }

        test = function() {
            xhttp(func, '/SRedakt/PHP/control.php', 'table=' + data.type + '&nameValid=' + document.getElementById(idName + 'Name').value + adresar[data.type]);
        }

        clearTimeout(data.timeout);
        data.timeout = setTimeout(test, 500);
    }

    this.newName = function (i=1) {
        //promměné
        let name;
        //f-ce
        let func;
        //data
        let nova = ['složka', 'složka', 'šablona', 'stránka', 'formulář'];
        let dom = ['newFolderName', 'newFolderName', 'newTemplateName', 'newPageName', 'newFolderName'];
        let adresar = ['', '', '&kategorie=' + data.idFolder, '&adresar=' + data.idFolder, ''];
        data.canCreate = true;

        func = function(text) {
            if (text == 1) {
                name.value = 'Nová ' + nova[data.type] + ' (' + i + ')';
                control.newName(i + 1);
            }
        }
        name = document.getElementById(dom[data.type]);
        xhttp(func, '/SRedakt/PHP/control.php', 'table=' + data.type + '&nameValid=' + name.value + adresar[data.type]);
    }

    this.create = function() {
        //proměnné

        //f-ce
        let finnish;

        //data
        let dom = ['newFolderName', 'newFolderName', 'newTemplateName', 'newPageName', 'newFolderName'];
        let name = document.getElementById(dom[data.type]).value;
        let adresar = ['', '', '&kategorie=' + data.idFolder, '&adresar=' + data.idFolder, ''];

        finnish = function(text) {
            if (data.type == 3) {
                window.open('/SRedakt/editor.php?page=' + text);
            } else if (data.type == 2) {
                window.open('/SRedakt/editor.php?template=' + text);
            }
            location.reload();
        }

        if(data.canCreate) {
            xhttp(finnish, '/SRedakt/PHP/control.php', 'create=' + data.type + '&name=' + name + adresar[data.type]);
        }
    }

    //mazání prvku
    this.remove = function() {
        let func = function(text) {
            location.reload();
        }
        xhttp(func, '/SRedakt/PHP/control.php', 'table=' + data.type + '&removeId=' + data.id);
    }

    //vlastnosti
    this.setName = function() {
        //proměnné

        //f-ce

        //data
        let dom = ['changeThisFolderName', 'changeThisFolderName', 'changeTemplateName', 'changePageName', 'changeThisFolderName'];
        let textType = ['folder', 'folder', 'template', 'page', 'folder'];
        document.getElementById(dom[data.type]).value = document.getElementById(textType[data.type] + data.id).innerHTML;
    }

    this.changeName = function() {
        //proměnné
        let name;

        //f-ce
        let reload;

        //data
        let dom = ['changeThisFolderName', 'changeThisFolderName', 'changeTemplateName', 'changePageName', 'changeThisFolderName'];
        let textType = ['folder', 'folder', 'template', 'page', 'folder'];

        reload = function(text) {
            document.getElementById(textType[data.type] + data.id).innerHTML = name;
        }

        if(data.canCreate) {
            name = document.getElementById(dom[data.type]).value;
            xhttp(reload, '/SRedakt/PHP/control.php', 'changeName=' + name + '&id=' + data.id + '&table=' + data.type);
        }
        
    }

    this.changeFolder = function(idFolder) {
        //proměnné
        let success;
        let warning;

        //f-ce
        let action;
        let confirm;

        //data
        let textType = ['folder', 'folder', 'template', 'page'];
        let adresar = ['', '', '&kategorie=' + idFolder, '&adresar=' + idFolder];

        action = function(text) {
            if (text == 0) {
                xhttp(confirm, '/SRedakt/PHP/control.php', 'changeFolder=' + data.id + '&type=' + data.type + '&tabulka=' + idFolder);        
            } else {
                success.className = 'alert alert-success d-none';
                warning.className = 'alert alert-danger';
            }
        }

        confirm = function(text) {
            success.className = 'alert alert-success';
            warning.className = 'alert alert-danger d-none';
        }

        success = document.getElementById('changeFolderSuccess');
        warning = document.getElementById('changeFolderWarning');
        xhttp(action, '/SRedakt/PHP/control.php', 'table=' + data.type + '&nameValid=' + document.getElementById(textType[data.type] + data.id).innerHTML + adresar[data.type]);
    }

    //publikování
    this.public = function() {
        //dom
        let input = document.getElementById('publicName');

        input.value = document.getElementById('folder' + data.idFolder).innerHTML.replace(/ /g, '') + '/' + document.getElementById('page' + data.id).innerHTML.replace(/ /g, '') + '.php';
        me.controlAdress();
    }

    this.controlAdress = function() {
        //dom
        let input = document.getElementById('publicName');

        let func;
        let test;

        func = function(text) {
            let alert = document.getElementById('publicWarning');
            let btn = document.getElementById('publicSuccess');
            if (text >= 1) {
                alert.className = 'alert alert-danger';
                btn.className = 'btn btn-success disabled';
                btn.setAttribute('data-dismiss', '');
                data.canPublic = false;
            } else if (text == 0) {
                alert.className = 'alert alert-danger d-none';
                btn.className = 'btn btn-success';
                btn.setAttribute('data-dismiss', 'modal');
                data.canPublic = true;
            }
        }

        test = function() {
            xhttp(func, '/SRedakt/PHP/control.php', 'controlAddress=' + input.value);
        }

        clearTimeout(data.timeout);
        data.timeout = setTimeout(test, 500);
    }

    this.publicConfirm = function() {
        let func;

        //dom
        let input = document.getElementById('publicName');
        let button = document.getElementById('publicButton' + data.id);

        func = function(text) {
            button.innerHTML = 'Skrýt';
            button.removeAttribute('data-toggle');
            button.onclick = function() {
                control.setId(data.id); 
                unpublic();
            }
        }
        xhttp(func, '/SRedakt/PHP/control.php', 'public=' + input.value + '&id=' + data.id);
    }

    this.unpublic = function() {
        let button = document.getElementById('publicButton' + data.id);
        let func = function(text) {
            button.innerHTML = 'Publikovat';
            button.setAttribute('data-toggle', 'modal');
            button.onclick = function() {
                control.setId(data.id); 
                control.setIdFolder(data.idFolder); 
                control.public();
            }
        }
        xhttp(func, '/SRedakt/PHP/control.php', 'unpublic=' + data.id);
    }

    publicConfirm = this.publicConfirm;
    unpublic = this.unpublic;
}



control = new Control();
