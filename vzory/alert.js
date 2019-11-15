/*
Vstupy
    items
    elements
    json_alert
*/

Alert = function() {
    var Item = function() {
        var id = {};
        id.local = items.length;
        var model = 0;
        this.self = document.createElement('div');

        this.eid = function(typ, data) {
            switch (typ) {
                case 'html':
                    id.html = data;
                    break;

                case 'local':
                    id.local = data;
                    break;

                case 'parent':
                    id.parent = data;
                    break;
            
                default:
                    break;
            }
        }
        this.gid = function(typ) {
            switch (typ) {
                case 'html':
                    return id.html;

                case 'local':
                    return id.local;

                case 'parent':
                    return id.parent;

                default:
                    break;
            }
        }

        this.emodel = function(data) {
            model = data;
        }
        this.gmodel = function() {
            return model;
        }
    }

    var items = [];

    this.create = function(parentID) {
        var id = items.length;
        items[id] = new Item ();
        items[id].eid('html', 'alert' + id);
        var alert = items[id].self;
        alert.className = 'alert alert-primary';
        alert.textContent = 'alert';
        items[id].eid('parent', parentID);
        return items[id];
    }

    this.load = function(id, id_parent) {
        const item = json_alert[id];
        var alert = document.createElement('div');
        alert.id = 'alert' + id;
        alert.className = 'alert alert-' + data.colors[item.styl];
        alert.textContent = item.text;
        
        document.getElementById(id_parent).appendChild(alert);
    
        for (let i = 0; i < item.elements.length; i++) {
            const element = item.elements[i];
            elements[element.typ].load(element.id, alert.id);
        }
    }

    this.items = function(id) {
        return items[id];   
    }
}

elements['alert'] = function(id, id_parent) {
    const item = json_alert[id];
    var alert = document.createElement('div');
    alert.id = 'alert' + id;
    alert.className = 'alert alert-' + data.colors[item.styl];
    alert.textContent = item.text;
    
    document.getElementById(id_parent).appendChild(alert);

    for (let i = 0; i < item.elements.length; i++) {
        const element = item.elements[i];
        elements[element.typ](element.id, alert.id);
    }
    
}

elements['alert'] = new Alert();