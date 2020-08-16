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



//načtení stránky
    if(isset($_GET['form'])) {
        $sql = 'SELECT json, nazev FROM form WHERE id = ?';
        $stmt = $db->stmtStart($sql);
        $stmt->bind_param("i", $id);
        $id = $_GET['form'];

        $stmt->execute();
        $data = $stmt->get_result()->fetch_all(1)[0];
        $db->stmtStop($stmt);

        $json = $data['json'];
        if($json == null) {
            $json = '{}';
        }
        $nazev = $data['nazev'];

        echo ('<script> 
        let load = function() {
        return' . $json . ';
        }
        let globalId = ' . $_GET['form'] . '
        </script>');
    } else {
        echo ('<script> 
        let load = false;
        </script>');
    }
?>

<!DOCTYPE html>
<html>

<head>
    <title><?php echo($database->webName); ?></title>
    <link rel="stylesheet" href="/SRedakt/bootstrap/bootstrap.css">
    <script src="/SRedakt/js/load.js"></script>
</head>

<body>
    <div id="body" class="container-fluid">
        <h1><?php echo($nazev); ?></h1>
    </div>
    <div class="d-flex justify-content-center">
        <button class="btn btn-success" onclick="controler.send()">Odeslat formulář</button>
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
                    <button id="textEditorSuccess" class="btn btn-success" data-dismiss="modal"">Použít</button>
                    <button id="textEditorCancel" class="btn btn-danger" data-dismiss="modal">Zrušit</button>
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
                        <li class="list-group-item list-group-item-action d-flex justify-content-center" onclick="control.setName()"><b>Automaticky vygenerovat nový formulář pro tuto stránku</b></li>
                        <li class="list-group-item list-group-item-action d-flex justify-content-center" data-toggle="collapse" data-target="#createForm"><b>Vytvořit nový prázdný formulář</b></li>
                        <div class="collapse"  id="createForm">
                            <li class="list-group-item d-flex justify-content-center">
                                <div>
                                    <div id="changeTemplateWarning" for="name" class="alert alert-danger d-none">Tento název již existuje!</div>
                                    <div class="d-flex justify-content-center">
                                        <div class="form-gorup">
                                            <input placeholder="Název formuláře" id="formName" type="text" class="form-control">
                                        </div>
                                        <button id="createFormButton" class="btn btn-success">Vygenerovt formulář</button>
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
                    <button id="textEditorCancel" class="btn btn-danger" data-dismiss="modal">Zrušit</button>
                </div>
            </div>
        </div>
    </div>

    

    <script src="/SRedakt/bootstrap/jQuery.js"></script>
    <script src="/SRedakt/bootstrap/popper.js"></script>
    <script src="/SRedakt/bootstrap/bootstrap.js"></script>
</body>
</html>
