'use strict'
let Data;

Data = function() {
    let item;
    let func;

    item = {
        text : {
            nazev : 'Text',
            input : 'input',
            typ : 'text',
        },
        longText : {
            nazev : 'Dlouhý text',
            input : 'textarea',
            typ : 'text',
        }
    }

    func = {
        xhttp : function(func, file, data) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {if (this.readyState == 4 && this.status == 200) {func(this.responseText)}};
            xhttp.open('POST', file, true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(data);
        }
    } 

    this.item = item;
    this.func = func;
}