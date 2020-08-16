let setDatabase;
let createDatabase;
let xhttp;
let form;


xhttp = function(func, file, data) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {if (this.readyState == 4 && this.status == 200) {func(this.responseText)}};
    xhttp.open('POST', file, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(data);
}

setDatabase = function() {
    //dom
    let self = document.getElementById('DB');
    let alert = document.getElementById('alertDB');
    let serverName = document.getElementById('serverNameDB');
    let userNameDb = document.getElementById('userNameDbDB');
    let dbName = document.getElementById('dbNameDB');
    let pass = document.getElementById('passDB');
    let btn = document.getElementById('btnDB');

    //f-ce
    let finnish

    finnish = function(text) {
        console.log(text)
        if(text != '') {
            alert.className = 'alert alert-danger';
        } else {
            alert.className = 'd-none';
            self.className = 'd-none';
            createDatabase();
        }
    }

    btn.onclick = function() {
        xhttp(finnish, '/SRedakt/firstSettings/php.php', 'serverName=' + serverName.value + '&userNameDb=' + userNameDb.value + '&dbName=' + dbName.value + '&pass=' + pass.value);
    }

    self.className = 'card';
}

createDatabase = function() {
    //dom
    let self = document.getElementById('cDB');
    let btnNext = document.getElementById('btnNextcDB');
    let btnBack = document.getElementById('btnBackcDB');

    //f-ce
    let finnish;

    finnish = function(text) {
        self.className = 'd-none';
        form();
    }

    btnBack.onclick = function() {
        self.className = 'd-none';
        setDatabase();
    }
    btnNext.onclick = function() {
        xhttp(finnish, '/SRedakt/firstSettings/php.php', 'createDB=true');
    }

    self.className = 'card';
}

form = function() {
    //dom
    let webName = document.getElementById('webNameU');
    let self = document.getElementById('U');
    let alert = document.getElementById('alertU');
    let alertText = document.getElementById('alertTextU');
    let name = document.getElementById('nameU');
    let controlPass = document.getElementById('controlPassU');
    let pass = document.getElementById('passU');
    let btn = document.getElementById('btnU');

    //f-ce
    let finnish;

    finnish = function(text) {
        location.reload();
    }
    
    btn.onclick = function () {
        if (name.value == '' || pass.value == '' || webName.value == '') {
            alert.className = 'alert alert-danger';
            alertText.innerHTML = 'Pole nesmí zústat prázdné!';
        } else if (pass.value != controlPass.value) {
            alert.className = 'alert alert-danger';
            alertText.innerHTML = 'Hesla nejsou stejná';
        } else {
            xhttp(finnish, '/SRedakt/firstSettings/php.php', 'name=' + name.value + '&pass=' + pass.value + '&webName=' + webName.value);
        }
    }

    self.className = 'card';
}