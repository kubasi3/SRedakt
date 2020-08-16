
<script src='/SRedakt/js/control.js'></script>

<h1>Stránky</h1>


<?php
    $sql = 'SELECT * FROM adresar ORDER BY nazev ASC';
    $folders = $db->select($sql)->fetch_all(1);
    for ($i=0; $i < count($folders); $i++) { 
        
        echo('
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col col-8">
                        <a id="folder' . $folders[$i]['id'] . '" class="car-link" data-toggle="collapse" href="#folderCollapse' . $folders[$i]['id'] . '">' . $folders[$i]['nazev'] . '</a>
                    </div>
                    <div class="col col-4">
                        <button class="btn btn-danger" onclick="control.setId(' .  $folders[$i]['id'] . '); control.setType(0)" data-toggle="modal" data-target="#delFolder">Vymazat</button>
                        <button class="btn btn-info" onclick="control.setId(' .  $folders[$i]['id'] . '); control.setType(0)" data-toggle="modal" data-target="#editFolder">Vlastnosti</button>
                    </div>
                </div>
            </div>
            <div id="folderCollapse' . $folders[$i]['id'] . '" class="collapse">
                <div class="card-body">
                    <ul class="list-group list-group-flush">
        ');
        $sql = 'SELECT nazev, id, publikovano  FROM stranka WHERE adresar = ' . $folders[$i]['id'] . ' ORDER BY nazev ASC';
        $pages = $db->select($sql)->fetch_all(1);
        foreach ($pages as $page) {
            if ($page['publikovano'] == 0) {
                $text = 'Publikovat';
                $fce = 'public';
                $modal = 'modal';
            } elseif ($page['publikovano'] == 1) {
                $text = 'Skrýt';
                $fce = 'unpublic';
                $modal = '';
            }
            echo('
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col col-8">
                                <a id="page' . $page['id'] . '" target=_blank href="/SRedakt/editor.php?page=' . $page['id'] . '">' . $page['nazev'] . '</a>
                            </div>
                            <div class="col col-4">
                                <button class="btn btn-danger" onclick="control.setId(' .  $page['id'] . '); control.setType(3)" data-toggle="modal" data-target="#delPage">Vymazat</button>
                                <button class="btn btn-info" onclick="control.setId(' .  $page['id'] . '); control.setType(3); control.setIdFolder(' .  $folders[$i]['id'] . ')" data-toggle="modal" data-target="#editPage">Vlastnosti</button>
                                <button id="publicButton' .  $page['id'] . '" class="btn btn-info" onclick="control.setId(' .  $page['id'] . '); control.setIdFolder(' .  $folders[$i]['id'] . '); control.' . $fce . '()" data-toggle="' . $modal . '" data-target="#public">' . $text . '</button>
                            </div>
                        </div>
                    </li>
            ');
        }
        echo('
            <li class="list-group-item">
                <button class="btn btn-outline-dark" onclick="control.setIdFolder(' . $folders[$i]['id'] . '); control.setType(3); control.newName()" data-toggle="modal" data-target="#newPage">Nová stránka +</button>
            </li>
        ');
        echo('
                    </ul>
                </div>
            </div>
        </div>
        ');
    }
?>



<div class="card">
    <div class="card-header">
        <a class="car-link" data-toggle="collapse" href="#folder">
            <button class="btn btn-outline-dark" data-toggle="modal" data-target="#newFolder" onclick="control.setType(0); control.newName()">Nová složka +</button>
        </a>
    </div>
    <div id="folder' . $folders[$i]['id'] . '" class="collapse">
    </div>
</div>

<!--Formulář - nová stránka-->
<div class="modal" id="newPage">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title">Nová stránka</h4>
            </div>

            <div class="modal-body">
                <div class="row">
                    <div class="col">
                        <div class="form-gorup">
                            <!--Input název-->
                            <div id="newPageWarning" for="name" class="alert alert-danger d-none">Tento název již existuje!</div>
                            <label for="name">Název</label>
                            <input value="Nová stránka" id="newPageName" type="text" class="form-control" onkeyup="control.controlName('newPage')">
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button id="newPageSuccess" class="btn btn-success" data-dismiss="modal" onclick="control.create()">Vytvořit</button>
                <button class="btn btn-danger" data-dismiss="modal">Zrušit</button>
            </div>
        </div>
    </div>
</div>

<!--Formulář - nová složka-->
<div class="modal" id="newFolder">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title">Nová složka</h4>
            </div>

            <div class="modal-body">
                <div class="row">
                    <div class="col">
                        <div class="form-gorup">
                            <!--Input název-->
                            <div id="newFolderWarning" for="name" class="alert alert-danger d-none">Tento název již existuje!</div>
                            <label for="name">Název</label>
                            <input id="newFolderName" type="text" class="form-control" onkeyup="control.controlName('newFolder')" value="Nová složka">
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

<!--Formulář - Smazání stránky-->
<div class="modal" id="delPage">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header d-flex justify-content-center">
                <h4 class="modal-title">Opravdu si přejete vymazat stránku?</h4>
            </div>

            <div class="modal-footer d-flex justify-content-center">
                <button id="newFolderSuccess" class="btn btn-success" data-dismiss="modal" onclick="control.remove()">ANO</button>
                <button class="btn btn-danger" data-dismiss="modal">NE</button>
            </div>
        </div>
    </div>
</div>

<!--Formulář - Smazání složky-->
<div class="modal" id="delFolder">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header d-flex justify-content-center">
                <h4 class="modal-title">Opravdu si přejete vymazat složku a všechny stránky v ní obsažené?</h4>
            </div>

            <div class="modal-footer d-flex justify-content-center">
                <button id="newFolderSuccess" class="btn btn-success" data-dismiss="modal" onclick="control.remove()">ANO</button>
                <button class="btn btn-danger" data-dismiss="modal">NE</button>
            </div>
        </div>
    </div>
</div>

<!--Formulář - Vlastnosti stránky-->
<div class="modal" id="editPage">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header d-flex justify-content-center">
                <h4 class="modal-title">Vlastnosti stránky</h4>
            </div>

            <div class="modal-body d-flex justify-content-center">
                <ul class="list-group">
                    <li class="list-group-item list-group-item-action d-flex justify-content-center" onclick="control.setName()" data-toggle="collapse" data-target="#changePageNameForm"><b>Změnit název</b></li>
                    <div class="collapse"  id="changePageNameForm">
                        <li class="list-group-item d-flex justify-content-center">
                            <div>
                                <div id="changePageWarning" for="name" class="alert alert-danger d-none">Tento název již existuje!</div>
                                <div class="d-flex justify-content-center">
                                    <div class="form-gorup">
                                        <input id="changePageName" type="text" class="form-control" onkeyup="control.controlName('changePage')" id="name">
                                    </div>
                                    <button id="changePageSuccess" class="btn btn-success" onclick="control.changeName()">Změnit název</button>
                                </div>
                            </div>
                        </li>
                    </div>
                    <li class="list-group-item list-group-item-action d-flex justify-content-center" data-toggle="collapse" data-target="#changeFolder"><b>Přesunout do jiné složky</b></li>
                    <div class="collapse" id="changeFolder">
                        <li class="list-group-item">
                            <div>
                                <div id="changeFolderWarning" class="alert alert-danger d-none">Tato složka již stránku s tímto názvem obsahuje!</div>
                                <div id="changeFolderSuccess" class="alert alert-success d-none">Stránka byla přesunuta.</div>
                                <ul class="list-group list-group-flush">
                                    <?php
                                        for ($i=0; $i < count($folders); $i++) {
                                            echo(
                                                '<li class="list-group-item list-group-item-action" onclick="control.changeFolder(' . $folders[$i]['id'] . ')">' . $folders[$i]['nazev'] . '</li>
                                            ');
                                        }
                                    ?>
                                </ul>
                            </div>
                        </li>
                    </div>
                </ul>
            </div>

            <div class="modal-footer d-flex justify-content-center">
                <button id="changeFolderSuccess" class="btn btn-success" data-dismiss="modal" onclick="location.reload();">Hotovo</button>
            </div>
        </div>
    </div>
</div>

<!--Formulář - Vlastnosti složky-->
<div class="modal" id="editFolder">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header d-flex justify-content-center">
                <h4 class="modal-title">Vlastnosti stránky</h4>
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

<!--Formulář - Publikování-->
<div class="modal" id="public">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <h4 class="modal-title">Publikovat</h4>
            </div>

            <div class="modal-body">
                <div class="row">
                    <div class="col">
                        <div class="form-gorup">
                            <!--Input název-->
                            <div id="publicWarning" for="name" class="alert alert-danger d-none">Tato adresa již existuje!</div>
                            <label for="name">Adresa</label>
                            <input value="Nová stránka" id="publicName" type="text" class="form-control" onkeyup="control.controlAdress()">
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button id="publicSuccess" class="btn btn-success" data-dismiss="modal" onclick="control.publicConfirm()">Publikovat</button>
                <button class="btn btn-danger" data-dismiss="modal">Zrušit</button>
            </div>
        </div>
    </div>
</div>