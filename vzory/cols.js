/*
Vstupy
    elements
    json_col
*/
elements['col'] = function(id, id_parent) {
    var col = document.createElement('div');
    col.id = 'col' + id;
    col.className = 'col';
    document.getElementById(id_parent).appendChild(col);

    if (json_col[id].width['xs']) {
        col.className = col.className + ' col-' + json_col[id].width['xs'];
    }if (json_col[id].width['sm']) {
        col.className = col.className + ' col-sm-' + json_col[id].width['sm'];
    }if (json_col[id].width['md']) {
        col.className = col.className + ' col-md-' + json_col[id].width['md'];
    }if (json_col[id].width['lg']) {
        col.className = col.className + ' col-lg-' + json_col[id].width['lg'];
    }if (json_col[id].width['xl']) {
        col.className = col.className + ' col-xl-' + json_col[id].width['xl'];
    }

    for (let i = 0; i < json_col[id].elements.length; i++) {
        const element = json_col[id].elements[i];
        elements[element.typ](element.id, col.id);
    }
    
}