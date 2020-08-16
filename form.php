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
    <script src="/SRedakt/js/dataForm.js"></script>
    <script src="/SRedakt/js/mainForm.js"></script>
    <script src="/SRedakt/js/itemForm.js"></script>
</head>

<body>
    <div id="editPanel" class='fixed-top'>
        <!-- navBar -->
        <div class="navbar navbar-expand bg-dark navbar-dark">
            <ul id="navUl" class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a onclick="controler.create('text')" class="nav-link">Text</a>
                </li>
                <li class="nav-item">
                    <a onclick="controler.create('longText')" class="nav-link">Dlouhý text</a>
                </li>
            </ul>
            <span>
                <span class="text-white-50"><?php echo($nazev); ?></span>
                <a target="_blank"  href="/SRedakt/formData.php?form=<?php echo($id); ?>">
                    <button class="btn btn-outline-info">Vložit data</button>
                </a>
                <button id="btnSave" class="btn btn-success">Uložit</button>
            </span>
        </div>

    <div class="row" style="margin-top:200px">
        <div class="col col-10">
            <div id="body" class="container-fluid">

            </div>
        </div>
        <div class="col col-2">
            <div class="card">
                <ul id="sideBar" class="list-group-flush">
                
                </ul>
            </div>
        </div>
    </div>

    

    <script src="/SRedakt/bootstrap/jQuery.js"></script>
    <script src="/SRedakt/bootstrap/popper.js"></script>
    <script src="/SRedakt/bootstrap/bootstrap.js"></script>
</body>
</html>
