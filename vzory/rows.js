/*
Vstupy
    elements
    json_row
*/
elements['row'] = function(id, id_parent) {
    var row = document.createElement('div');
    row.id = 'row' + id;
    row.className = 'row';
    document.getElementById(id_parent).appendChild(row);

    //row.textContent = ' ';

    for (let i = 0; i < json_row[id].elements.length; i++) {
        const element = json_row[id].elements[i];
        elements[element.typ](element.id, row.id);
    }
    
}