<?php
session_start();
$rootAddress = file('address.txt');
$rootAddress = $rootAddress[0];
$oddelovac = $rootAddress[strlen($rootAddress) - 1];
$logText = '';

$database = json_decode(file($rootAddress . 'SRedakt' . $oddelovac . 'DBinfo' . $oddelovac . 'dbinfo.json')[0]);
if (isset($_GET['menu'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP/logTest.php';
}
?>

<!DOCTYPE html>
<html>

<head>
    <title><?php echo($database->webName) ?></title>
    <link rel="stylesheet" href="/SRedakt/bootstrap/bootstrap.css">
</head>
<body>

    <!--Vytvoření objektu databáze-->
    <?php
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();
    ?>

    <!-- Horní navigace-->
    <div id="editPanel" class='fixed-top'>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/SRedakt/index.php">Domů
                    </a>
                </li>
            </ul>
            <form class="form" action="/SRedakt/PHP/logout.php">
                <button id="logout" type="submit" class="btn btn-outline-danger d-none">Odhlásit se</button>
            </form>
        </nav>
    </div>

    <div class="row" style="margin-top:100px">

        <!--Boční menu-->
        <div class="col col-2">
            <nav class="navbar bg-dark navbar-dark">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/SRedakt/index.php?menu=page">Stránky</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/SRedakt/index.php?menu=template">Šablony</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/SRedakt/index.php?menu=form">Formuláře</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/SRedakt/index.php?menu=settings">Nastavení</a>
                    </li>
                </ul>
            </nav>
        </div>

        <!--Obsah stránky-->
        <div class="col col-10">
            <div id = "body" class="container-fluid">
                <?php
                    if (isset($_GET["menu"])) {
                        if ($_GET["menu"] == "page") {
                            include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'page.php';
                        } elseif($_GET["menu"] == "template") {
                            include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'template.php';
                        } elseif($_GET["menu"] == "settings") {
                            include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'settings.php';
                        } elseif($_GET["menu"] == "form") {
                            include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'form.php';
                        } 
                    } else {
                        include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'login.php';
                    }
                ?>
            </div>
        </div>

    </div>


    <script src="/SRedakt/bootstrap/jQuery.js"></script>
    <script src="/SRedakt/bootstrap/popper.js"></script>
    <script src="/SRedakt/bootstrap/bootstrap.js"></script>
    <?php echo($logText); ?>
</body>