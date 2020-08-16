<?php
session_start();
$rootAddress = file('address.txt');
$rootAddress = $rootAddress[0];
$oddelovac = $rootAddress[strlen($rootAddress) - 1];
$logText = '';

$database = json_decode(file($rootAddress . 'SRedakt' . $oddelovac . 'DBinfo' . $oddelovac . 'dbinfo.json')[0]);
include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'logTest.php';
include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
$db = new DB();
?>

<!DOCTYPE html>
<html>

<head>
    <title><?php echo($database->webName); ?></title>
    <link rel="stylesheet" href="/SRedakt/bootstrap/bootstrap.css">
    <script src="/SRedakt/js/navBarEditor.js"></script>
    <script src="/SRedakt/js/dataEditor.js"></script>
    <script src="/SRedakt/js/mainEditor.js"></script>
    <script src="/SRedakt/js/itemEditor.js"></script>
</head>

<body>
    <div id="editPanel" class='fixed-top'>
        <!-- navBar -->
        <div class="navbar navbar-expand bg-dark navbar-dark">
            <ul id="navUl" class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link">text</a>
                </li>
            </ul>
            <span>
                <span id="spanNazev" class="text-white-50"></span>
                <button id="btnSave" class="btn btn-success">Uložit</button>
            </span>
        </div>
        <!-- templateBar -->
        <div class="navbar navbar-expand bg-secondary navbar-secondary">
            <ul class="navbar-nav mr-auto">
                <?php 
                    $sql = 'SELECT nazev, id FROM kategorie';
                    $result = $db->select($sql);

                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $id = $row["id"];
                            $sql = "SELECT nazev, id FROM prvek WHERE kategorie = {$row['id']}";
                            if (isset($_GET['template'])) {
                                $sql = $sql . " AND id != {$_GET['template']}";
                            }
                            $res = $db->select($sql);
                            if ($res->num_rows > 0) {
                                echo ('
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" data-toggle="dropdown" > ' . $row['nazev'] . '</a>
                                        <div class="dropdown-menu">
                                ');
                                while($row2 = $res->fetch_assoc()) {
                                    echo ('
                                            <a class="dropdown-item" onclick="data.temp.appChild(' . $row2['id'] . ')"> ' . $row2['nazev'] . '</a>
                                    ');
                                }
                                echo ('
                                        </div>
                                    </li>
                                ');
                            }
                        }
                    }
                ?>
            </ul>
            <span>
            </span>
        </div>
        <!-- selfBar -->
        <div id="selfBar" class="navbar navbar-expand bg-primary navbar-primary d-none">
            <span id="selfUl" class="mr-auto">
                <li class="nav-item">
                    <a class="nav-link">text</a>
                </li>
            </span>
            <span>
                <button id="btnMoveUp" class="btn btn-outline-dark">↑</button>
                <button id="btnMoveDown" class="btn btn-outline-dark">↓</button>
                <button id="del" class="btn btn-danger">Odstranit</button>
            </span>
        </div>
    </div>

    <div class="row" style="margin-top:200px">
        <div class="col col-10">
            <div id="body" class="container-fluid">

            </div>
        </div>
        <div class="col col-2" id="navBar"></div>
    </div>


    <!--TextEditor-->
    <div class="modal" id="textEditor">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Textový editor</h4>
                </div>

                <div class="modal-body">
                    <div class="navbar navbar-expand-sm bg-dark navbar-dark">
                        <span id="textEditorMenu">

                        </span>
                    </div>
                    <iframe id="textEditorIframe" height="100%" width="100%">

                    </iframe>
                </div>

                <div class="modal-footer d-flex justify-content-center">
                    <button id="textEditorSuccess" class="btn btn-success" data-dismiss="modal">Použít</button>
                    <button id="textEditorCancel" class="btn btn-danger" data-dismiss="modal">Zrušit</button>
                </div>
            </div>
        </div>
    </div>

    <!--MultiSelect-->
    <div class="modal" id="multiSelect">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h4 id="multiSelectNadpis" class="modal-title"></h4>
                </div>

                <div id="multiSelectBody" class="modal-body">

                </div>

                <div class="modal-footer d-flex justify-content-center">
                    <button id="multiSelectSuccess" class="btn btn-success" data-dismiss="modal">Použít</button>
                    <button id="multiSelectCancel" class="btn btn-danger" data-dismiss="modal">Zrušit</button>
                </div>
            </div>
        </div>
    </div>

    <!--Přiřazení formuláře-->
    <div class="modal" id="connForm">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Přiřazení dat z formuláře</h4>
                </div>

                <div class="modal-body d-flex justify-content-center">
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-action d-flex justify-content-center" data-toggle="collapse" data-target="#createForm"><b>Vytvořit nový prázdný formulář</b></li>
                        <div class="collapse"  id="createForm">
                            <li class="list-group-item d-flex justify-content-center">
                                <div>
                                    <div id="createFormAlertNoName" for="name" class="alert alert-danger d-none">Musíte zadat název!</div>
                                    <div id="createFormAlert" for="name" class="alert alert-danger d-none">Tento název již existuje!</div>
                                    <div class="d-flex justify-content-center">
                                        <div class="form-gorup">
                                            <input placeholder="Název formuláře" id="createFormName" type="text" class="form-control">
                                        </div>
                                        <button id="createFormButton" class="btn btn-success">Vytvořit formulář</button>
                                    </div>
                                </div>
                            </li>
                        </div>
                        <li class="list-group-item list-group-item-action d-flex justify-content-center" data-toggle="collapse" data-target="#changeFolder"><b>Vybrat data z existujícího formuláře</b></li>
                        <div class="collapse" id="changeFolder">
                            <li class="list-group-item">
                                <div>
                                    <div id="changeFolderWarning" class="alert alert-danger d-none">Tato složka již stránku s tímto názvem obsahuje!</div>
                                    <div id="changeFolderSuccess" class="alert alert-success d-none">Stránka byla přesunuta.</div>
                                    <ul class="list-group">
                                        <?php
                                            $sql = "SELECT nazev, id, json FROM form";
                                            $data = $db->select($sql);
                                            if($data->num_rows > 0) {
                                                while($row = $data->fetch_assoc()) {
                                                    echo(
                                                        '<li class="list-group-item list-group-item-action" data-toggle="collapse" data-target="#form' . $row['id'] . '">' . $row['nazev']
                                                    );
                                                    $json = json_decode($row['json']);
                                                    if(isset($json->childs)) {
                                                        echo('<ul class="list-group list-group-flush collapse" id="form' . $row['id'] . '">');
                                                        foreach ($json->childs as $child) {
                                                            echo('<li data-dismiss="modal" class="list-group-item list-group-item-action" onclick="data.activeItem.addForm(' . $row['id'] . ', ' . "'" . $child->name . "'" . ')">' . $child->name . '</li>');
                                                        }
                                                        echo('</ul>');
                                                    }
                                                    echo('</li>');
                                                }
                                            }
                                        ?>
                                    </ul>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>

                <div class="modal-footer d-flex justify-content-center">
                    <button id="textEditorCancel" class="btn btn-danger" data-dismiss="modal">Zrušit</button>
                </div>
            </div>
        </div>
    </div>

    <?php
    //načtení stránky
        if(isset($_GET['page'])) {
            $sql = 'SELECT json, nazev FROM stranka WHERE id = ' . $_GET['page'];
            $json = $db->select($sql)->fetch_all(1);
            echo ('<script> 
            let load = function() {
            body.nazev = "' . $json[0]['nazev'] . '";
            body.loadPage(' . $json[0]['json'] . ');
            document.getElementById("spanNazev").innerHTML = body.nazev;
            }
            let globalid = ' . $_GET['page'] . ';
            let globaltable = 3;
            </script>');
        }elseif(isset($_GET['template'])){
            $sql = 'SELECT json, nazev FROM prvek WHERE id = ' . $_GET['template'];
            $json = $db->select($sql)->fetch_all(1);
            echo ('<script> 
            let load = function() {
            body.nazev = "' . $json[0]['nazev'] . '";
            body.loadPage(' . $json[0]['json'] . ');
            document.getElementById("spanNazev").innerHTML = body.nazev;
            }
            let globalid = ' . $_GET['template'] . ';
            let globaltable = 2;
            </script>'); 
        } else {
            echo ('<script> 
            let load = false;
            </script>');
        }
    ?>

    <script src="/SRedakt/bootstrap/jQuery.js"></script>
    <script src="/SRedakt/bootstrap/popper.js"></script>
    <script src="/SRedakt/bootstrap/bootstrap.js"></script>
</body>
</html>
