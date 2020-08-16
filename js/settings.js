'use strict'
let set;

let Settings = function() {
    //proměnné
    let canEdit = true;
    let lastId;
    let xhttp

    xhttp = function(func, file, data) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {if (this.readyState == 4 && this.status == 200) {func(this.responseText)}};
        xhttp.open('POST', file, true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(data);
    };

    this.edit = function(id) {
        //dom
        let button = document.getElementById(id + 'Btn');
        let span = document.getElementById(id + 'Span');
        let input = document.getElementById(id + 'Input');

        if (canEdit) {
            canEdit = false;
            lastId = id;
            
            button.className = 'btn btn-warning';
            button.innerHTML = 'Hotovo';

            span.className = 'd-none';
            input.className = '';
        } else if(lastId == id) {
            let finnish = function(text) {
                canEdit = true;

                button.className = 'btn btn-success';
                button.innerHTML = 'Upravit';

                span.className = '';
                span.innerHTML = input.value;
                input.className = 'd-none';
                if (id=='serverName' || id=='userNameDb' || id=='dbName') {
                    set.dbControl();
                }
            }

            xhttp(finnish, '/SRedakt/PHP/control.php', 'json=' + id + '&value=' + input.value);
        }
    }

    this.dbControl = function() {
        let alert = document.getElementById('dbAlert');

        let finnish = function(text) {
            if (text === 'true') {
                alert.className = 'alert alert-success';
                alert.innerHTML = 'Databáze je připojena.';
            } else {
                alert.className = 'alert alert-danger';
                alert.innerHTML = 'Při pokusu o připojení databáze nastala chyba!';
            }
        }
        xhttp(finnish, '/SRedakt/PHP/control.php', 'dbControl=true');
    }

    this.passEdit = function(id) {
        //dom
        let button = document.getElementById(id + 'Btn');
        let span = document.getElementById(id + 'Span');
        let input1 = document.getElementById(id + 'Input1');
        let input2 = document.getElementById(id + 'Input2');
        let div = document.getElementById(id + 'Div');

        if (canEdit) {
            canEdit = false;
            lastId = id;
            
            button.className = 'btn btn-warning';
            button.innerHTML = 'Potvrdit';

            span.className = 'd-none';
            div.className = '';
        } else if(lastId == id) {
            let finnish = function(text) {
                if (text === 'true') {
                    canEdit = true;
    
                    button.className = 'btn btn-info';
                    button.innerHTML = 'Změnit';
    
                    span.className = '';
                    div.className = 'd-none';
                    input1.value = '';
                    input2.value = '';
                    if (id=='password') {
                        set.dbControl();
                    }
                } else if (text === 'oldPassError') {
                    document.getElementById(id + 'OldAlert').className = 'alert alert-danger';
                }
            }

            let alert = document.getElementById(id + 'Alert');
            let oldPass = '';
            if (id == 'userPass') {
                oldPass = '&oldPass=' + document.getElementById(id + 'OldPass').value;
                document.getElementById(id + 'OldAlert').className = 'd-none';
            }

            if (input1.value == input2.value) {
                alert.className = 'd-none';
                xhttp(finnish, '/SRedakt/PHP/control.php', 'jsonPass=' + id + '&value=' + input1.value + oldPass);
            } else {
                alert.className = 'alert alert-danger';
            }
        }
    }
}

set = new Settings();