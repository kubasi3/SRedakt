Editor = function() {
    var navBar = new NavBar();
    var primary = new NavElement('primary');

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
    self.appendChild(button);

    var div = document.createElement('div');
    div.className = 'dropdown-menu';
    button.appendChild(button);

    var subButt = [];
    for (let i = 0; i < subButtons.length; i++) {
        const element = subButtons[i];

        subButt[i] = document.createElement('a');
        subButt[i].className = 'dropdown-item';
        
        
    }

    this.live = function() {
        return self;
    }
}

var editor;

window.onload = function() {
    editor = new Editor;
}
