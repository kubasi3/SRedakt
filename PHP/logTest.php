<?php
$rootAddress = file('address.txt');
$rootAddress = $rootAddress[0];
$oddelovac = $rootAddress[strlen($rootAddress) - 1];
if (!isset($_SESSION['login'])) {
    header("Location: " . $oddelovac . 'SRedakt' . $oddelovac . "index.php");
    exit;
} else {
    if (!$_SESSION['login']) {
        header("Location: " . $oddelovac . 'SRedakt' . $oddelovac . "index.php");
        exit;
    } else {
        if(isset($logText)) {
            $logText = '<script>document.getElementById("logout").className = "btn btn-outline-danger";</script>';
        }
    }
}
?>