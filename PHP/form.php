<script src='/SRedakt/js/control.js'></script>

<h1>Formuláře</h1>


<?php
    $sql = 'SELECT * FROM form ORDER BY nazev ASC';
    $folders = $db->select($sql)->fetch_all(1);
    for ($i=0; $i < count($folders); $i++) { 
        
        echo('
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col col-8">
                        <a id="folder' . $folders[$i]['id'] . '" class="car-link" target="_blank" href="/SRedakt/form.php?form=' . $folders[$i]['id'] . '">' . $folders[$i]['nazev'] . '</a>
                    </div>
                    <div class="col col-4">
                        <button class="btn btn-success" data-toggle="collapse" data-target="#folderCollapse' . $folders[$i]['id'] . '">Zobrazit data</button>
                        <button class="btn btn-danger" onclick="control.setId(' .  $folders[$i]['id'] . '); control.setType(4)" data-toggle="modal" data-target="#delFolder">Vymazat</button>
                        <button class="btn btn-info" onclick="control.setId(' .  $folders[$i]['id'] . '); control.setType(4)" data-toggle="modal" data-target="#editFolder">Vlastnosti</button>
                    </div>
                </div>
            </div>
            <div id="folderCollapse' . $folders[$i]['id'] . '" class="collapse">
                <div class="card-body">
        ');
        $sql = 'SELECT json FROM data WHERE form = ' . $folders[$i]['id'] . ' ORDER BY id ASC';
        $pages = $db->select($sql)->fetch_all(1);
        echo('
                <table class="table">
                    <thead>
                        <tr>
        ');
        if (isset($pages[0])) {
            foreach (json_decode($pages[0]['json']) as $key => $value) {
                echo('
                                <th>' . $key . '</th>
                ');
            }
            echo('
                        </tr>
                    </thead>
                    <tbody>
                ');
            foreach ($pages as $page) {
                echo('
                        <tr>
                ');
                foreach (json_decode($page['json']) as $value) {
                    echo('
                                    <td>' . $value . '</td>
                    ');
                }
                echo('
                        </tr>
                    ');
            }
            echo('
                        </tbody>
            ');
        }
        echo('
                        </table>
                        <a target="_blank"  href="/SRedakt/formData.php?form=' . $folders[$i]['id'] . '">
                            <button class="btn btn-outline-dark">Vložit data</button>
                        </a>
                    </div>
                </div>
            </div>
        ');
    }
?>

<div class="card">
    <div class="card-header">
        <a class="car-link" data-toggle="collapse" href="#folder">
            <button class="btn btn-outline-dark" data-toggle="modal" data-target="#newFolder" onclick="control.setType(4); control.newName()">Nový formulář +</button>
        </a>
    </div>
    <div id="folder' . $folders[$i]['id'] . '" class="collapse">
    </div>
</div>

<!--Formulář - nový formulář-->
<div class="modal" id="newFolder">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title">Nový formulář</h4>
            </div>

            <div class="modal-body">
                <div class="row">
                    <div class="col">
                        <div class="form-gorup">
                            <!--Input název-->
                            <div id="newFolderWarning" for="name" class="alert alert-danger d-none">Tento název již existuje!</div>
                            <label for="name">Název</label>
                            <input id="newFolderName" type="text" class="form-control" onkeyup="control.controlName('newFolder')" value="Nový formulář">
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button id="newFolderSuccess" class="btn btn-success" data-dismiss="modal" onclick="control.create()">Vytvořit</button>
                <button class="btn btn-danger" data-dismiss="modal">Zrušit</button>
            </div>
        </div>
    </div>
</div>

<!--Formulář - Smazání Formuláře-->
<div class="modal" id="delFolder">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header d-flex justify-content-center">
                <h4 class="modal-title">Opravdu si přejete vymazat formulář?</h4>
            </div>

            <div class="modal-footer d-flex justify-content-center">
                <button id="newFolderSuccess" class="btn btn-success" data-dismiss="modal" onclick="control.remove()">ANO</button>
                <button class="btn btn-danger" data-dismiss="modal">NE</button>
            </div>
        </div>
    </div>
</div>

<!--Formulář - Vlastnosti formuláře-->
<div class="modal" id="editFolder">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header d-flex justify-content-center">
                <h4 class="modal-title">Vlastnosti formuláře</h4>
            </div>

            <div class="modal-body d-flex justify-content-center">
                <ul class="list-group">
                    <li class="list-group-item list-group-item-action d-flex justify-content-center" onclick="control.setName()" data-toggle="collapse" data-target="#changeThisFolderNameForm"><b>Změnit název</b></li>
                    <div class="collapse"  id="changeThisFolderNameForm">
                        <li class="list-group-item d-flex justify-content-center">
                            <div>
                                <div id="changeThisFolderWarning" for="name" class="alert alert-danger d-none">Tento název již existuje!</div>
                                <div class="d-flex justify-content-center">
                                    <div class="form-gorup">
                                        <input id="changeThisFolderName" type="text" class="form-control" onkeyup="control.controlName('changeThisFolder')" id="name">
                                    </div>
                                    <button id="changeThisFolderSuccess" class="btn btn-success" onclick="control.changeName()">Změnit název</button>
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
            </div>

            <div class="modal-footer d-flex justify-content-center">
                <button id="changeThisFolderSuccess" class="btn btn-success" data-dismiss="modal" onclick="location.reload();">Hotovo</button>
            </div>
        </div>
    </div>
</div>