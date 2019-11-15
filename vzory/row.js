/*
Vstupy
    elements
    json_row
*/

var Row = function() {
    this.load = function(id, id_parent) {
        var row = document.createElement('div');
        row.id = 'row' + id;
        row.className = 'row';
        document.getElementById(id_parent).appendChild(row);
    
        //row.textContent = ' ';
    
        for (let i = 0; i < json_row[id].elements.length; i++) {
            const element = json_row[id].elements[i];
            elements[element.typ].load(element.id, row.id);
        }
    }
}

elements['row'] = new Row();
    