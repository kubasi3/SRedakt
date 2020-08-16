'use strict';

let navBar;
let data;
let item;
let body;

window.onload = function() {
    data = new Data();
    body = new Body();
    body.appChild(data.item.body.items.body)

    data.activeItem = body.child;
    body.child.li.className = 'list-group-item list-group-item-success';
    navBar = new NavBar();
    navBar.change(body.child);

    if(load) {
        load();
    }

}