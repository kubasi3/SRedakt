/*
Vstupy:
    elements
    json_page
*/

drive = function () {
    document.body.id = 'body';

    for (let i = 0; i < json_page.length; i++) {
        const element = json_page[i];
        elements[element.typ].load(element.id, 'body');
    }
}

window.onload = function() {
    drive();
}
