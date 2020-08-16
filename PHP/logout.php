<?php
$rootAddress = file('address.txt');
$rootAddress = $rootAddress[0];
$oddelovac = $rootAddress[strlen($rootAddress) - 1];

session_start();
$_SESSION['login'] = false;
header("Location: " . $oddelovac . 'SRedakt' . $oddelovac . "2ndex.php");
?>