'use strict';
var NavBar = function() {
    var navUl;
    var navBar;
    var selfBar;
    var selfUl;
    var removeButton;
    var editPanel;

    var navBarChange = function(idData, fun) {
        var dat;
        dat = data.navBar(idData);

        navBar.removeChild(navUl);
        navUl = document.createElement('ul');
        navUl.className = 'navbar-nav';
        for (let i = 0; i < dat.length; i++) {
            const element = dat[i];
            var navLi;
            var navA;
            var navDiv;


            navLi = document.createElement('li');
            navLi.className = 'nav-item dropdown';

            navA = document.createElement('a');
            navA.className = 'nav-link dropdown-toggle';
            navA.setAttribute('data-toggle', 'dropdown');
            navA.textContent = element[0][0];
            navLi.appendChild(navA);

            navDiv = document.createElement('div');
            navDiv.className = 'dropdown-menu';
            for (let l = 1; l < element.length; l++) {
                var navA;
                var create;

                navA = document.createElement('a');
                navA.className = 'dropdown-item';
                navA.textContent = element[l][0];
                navA.onclick = function(){fun(element[l][1])};
                navDiv.appendChild(navA);
            }
            navLi.appendChild(navDiv);
            navUl.appendChild(navLi);
        }
        navBar.appendChild(navUl);
    }

    var selfBarChange = function(idData, rem, setProperity) {
        var dat;
        dat = data.selfBar(idData);

        if (dat) {
            selfBar.removeChild(selfUl);
            selfUl = document.createElement('ul');
            selfUl.className = 'navbar-nav';
            
            removeButton.onclick = function() {rem()};
            selfUl.appendChild(removeButton);

            if (dat.properities) {
                for (let i = 0; i < dat.properities.length; i++) {
                    const properity = dat.properities[i];
                    switch (properity[1]) {
                        case 'select':
                            selfUl.appendChild(dataProperities.select(dat[properity[0]], setProperity));
                            break;
                    
                        default:
                            break;
                    }
                }
            }

            selfBar.appendChild(selfUl);
            selfBar.className = 'navbar navbar-expand-sm bg-primary navbar-primary';
        } else {selfBar.className = 'navbar navbar-expand-sm bg-primary navbar-primary d-none'};
    }

    this.change = function(idData, app, rem, setProperity) {

        navBarChange(idData, app);
        selfBarChange(idData, rem, setProperity);
    }

    editPanel = document.getElementById('editPanel');

    navUl = document.createElement('ul');
    navBar = document.createElement('nav');
    navBar.className = 'navbar navbar-expand-sm bg-dark navbar-dark';  
    navBar.appendChild(navUl); 
    editPanel.appendChild(navBar);

    selfUl = document.createElement('ul');
    selfBar = document.createElement('nav');
    selfBar.className = 'navbar navbar-expand-sm bg-primary navbar-primary d-none';
    selfBar.appendChild(selfUl);  
    editPanel.appendChild(selfBar);  

    removeButton = document.createElement('button');
    removeButton.className = ' btn btn-danger';
    removeButton.textContent = 'Odstranit';
}