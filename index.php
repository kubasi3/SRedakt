<?php
    $address = realpath('index.php');

    $counter = 0;
    $oddelovac;
    while ($counter < 2) {
        if ($address[strlen($address) - 1] == '/' OR $address[strlen($address) - 1] == '\\') {
            $counter ++;
            if($address[strlen($address) - 1] == '/') {
                $oddelovac = '/';
            } elseif($address[strlen($address) - 1] == '\\') {
                $oddelovac = '\\';
            }
        }
        $address = substr($address, 0, strlen($address) - 1);
    }
    $address = $address . $oddelovac;
    $file = fopen('address.txt', 'w');
    fwrite($file, $address);
    fclose($file);
    $file = fopen('PHP/address.txt', 'w');
    fwrite($file, $address);
    fclose($file);
    $file = fopen('firstSettings/address.txt', 'w');
    fwrite($file, $address);
    fclose($file);
    $file = fopen($address . 'address.txt', 'w');
    fwrite($file, $address);
    fclose($file);
?>


<!DOCTYPE html>
<html>

<head>
    <title>SRedakt</title>
    <script src="/SRedakt/firstSettings/js.js"></script>
    <link rel="stylesheet" href="/SRedakt/bootstrap/bootstrap.css">
</head>
<body>
    <div class="container">
        <h1>Nastavení aplikace</h1>



        <!--Form db-->
        <div class="card" id=DB>
            <div class="card-header">
                <h4 class="card-title">Databáze</h4>
            </div>
            <div class="card-body">
                <div class="d-none" id="alertDB">
                    <h6>K databázi se nedá připojit!</h6>
                    <p>Zkus zkontrolovat zadané údaje a oprávnění pro přístup k databázi</p>
                </div>
                <form>
                    <div class="form-group">
                        <label>Server:</label>
                        <input type="text" class="form-control" placeholder="Server name" id="serverNameDB">
                    </div>
                    <div class="form-group">
                        <label>Přihlašovací jméno:</label>
                        <input type="text" class="form-control" placeholder="User name" id="userNameDbDB">
                    </div>
                    <div class="form-group">
                        <label>Jméno databáze:</label>
                        <input type="text" class="form-control" placeholder="Database name" id="dbNameDB">
                    </div>
                    <div class="form-group">
                        <label>Heslo:</label>
                        <input type="password" class="form-control" placeholder="******" id="passDB">
                    </div>
                </form>
            </div>
            <div class="card-footer d-flex justify-content-end">
                <button class="btn btn-success" id="btnDB">Potvrdit a pokračovat >></button>
            </div>
        </div>

        <!--Create db-->
        <div class="d-none" id=cDB>
            <div class="card-header">
                <h4 class="card-title">Vytvoření kostry databáze</h4>
            </div>
            <div class="card-body">
                <div class="alert alert-warning" id="alertcDB">
                    <h6>Opravdu si přejete vybrat tuto databázi? Všechna obsažená data budou vymazána!</h6>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-end">
                <button class="btn btn-danger" id="btnBackcDB"><< Zpět</button>
                <button class="btn btn-success" id="btnNextcDB">Potvrdit a pokračovat >></button>
            </div>
        </div>

        <!--Form User-->
        <div class="d-none" id=U>
            <div class="card-header">
                <h4 class="card-title">Nastavení webu</h4>
            </div>
            <div class="card-body">
                <div class="d-none" id="alertU">
                    <h6 id="alertTextU">Hesla nejsou stejná!</h6>
                </div>
                <form>
                <div class="form-group">
                        <label>Název webu:</label>
                        <input type="text" class="form-control" placeholder="Web name" id="webNameU">
                    </div>
                    <div class="form-group">
                        <label>Jméno pro přihlášení do administrace:</label>
                        <input type="text" class="form-control" placeholder="Login" id="nameU">
                    </div>
                    <div class="form-group">
                        <label>Heslo:</label>
                        <input type="password" class="form-control" placeholder="******" id="passU">
                    </div>
                    <div class="form-group">
                        <label>Heslo znovu:</label>
                        <input type="password" class="form-control" placeholder="******" id="controlPassU">
                    </div>
                </form>
            </div>
            <div class="card-footer d-flex justify-content-end">
                <button class="btn btn-success" id="btnU">Potvrdit a pokračovat >></button>
            </div>
        </div>

    </div>
    <script src="/SRedakt/bootstrap/jQuery.js"></script>
    <script src="/SRedakt/bootstrap/popper.js"></script>
    <script src="/SRedakt/bootstrap/bootstrap.js"></script>
    <script>setDatabase();</script>
</body>