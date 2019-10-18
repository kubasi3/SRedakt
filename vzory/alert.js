/*
Vstupy
    elements
    json_alert
*/
elements['alert'] = function(id, id_parent) {
    const item = json_alert[id];
    var alert = document.createElement('div');
    alert.id = 'alert' + id;
    alert.className = 'alert-' + data.colors[item.styl];
    alert.textContent = item.text;
    
    document.getElementById(id_parent).appendChild(alert);

    for (let i = 0; i < item.elements.length; i++) {
        const element = item.elements[i];
        elements[element.typ](element.id, alert.id);
    }
    
}