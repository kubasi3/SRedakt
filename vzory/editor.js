Editor = function() {
    var primaryConf = [];
    primaryConf[0] = {};
    primaryConf[0].name = 'col';
    primaryConf[1] = {};
    primaryConf[1].name = 'row';
    primaryConf[2] = {};
    primaryConf[2].name = 'alert';

    var navBar = new NavBar();
    var primary = new NavElement('primary', primaryConf);

    navBar.child(primary.live());

}

NavBar = function() {
    var self = document.createElement('nav');
    self.className = 'navbar navbar-light bg-light';   

    document.body.appendChild(self);

    this.child = function(child) {
        self.appendChild(child);
    }
}

NavElement = function(name, subButtons) {
    var self = document.createElement('div');
    self.className = 'nav-item dropdown';

    var button = document.createElement('a');
    button.className = 'nav-link dropdown-toggle';
    button.textContent = name;
    button.setAttribute('data-toggle', 'dropdown');
    self.appendChild(button);

    var div = document.createElement('div');
    div.className = 'dropdown-menu';
    self.appendChild(div);

    var subButt = [];
    for (let i = 0; i < subButtons.length; i++) {
        const element = subButtons[i];

        subButt[i] = document.createElement('a');
        subButt[i].className = 'dropdown-item';
        subButt[i].textContent = element.name;
        div.appendChild(subButt[i]);
        
    }

    this.live = function() {
        return self;
    }
}

var editor;

window.onload = function() {
    editor = new Editor;
}
