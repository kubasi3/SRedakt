<?php
$rootAddress = file('address.txt');
$rootAddress = $rootAddress[0];
$oddelovac = $rootAddress[strlen($rootAddress) - 1];
if (isset($_POST['userNameDb'])) {
    $servername = $_POST['serverName'];
    $username = $_POST['userNameDb'];
    $password = $_POST['pass'];
    $dbname = $_POST['dbName'];

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $this->conn->connect_error);
        echo(FALSE);
    };

    class Data {};
    $data = new Data();
    $data->serverName = $servername;
    $data->userNameDb = $username;
    $data->password = $password;
    $data->dbName = $dbname;

    $file = fopen($rootAddress . 'SRedakt' . $oddelovac . 'DBinfo' . $oddelovac . 'dbinfo.json', "w");
    fwrite($file, json_encode($data));
    fclose($file);
}elseif (isset($_POST['createDB'])) {
    include_once $rootAddress . '/PHP/db.php';
    $db = new DB();

    $sql = "SELECT TABLE_NAME
    FROM   INFORMATION_SCHEMA.TABLES
    WHERE  TABLE_TYPE = 'BASE TABLE'";

    $result = $db->select($sql);
    if($result->num_rows > 0) {
        $data = $result->fetch_all(1);
    }

    for ($i=0; $i < count($data); $i++) { 
        $sql = "DROP TABLE {$data[$i]['TABLE_NAME']}";
        $db->insert($sql);
    }

    $slq = 'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
    SET AUTOCOMMIT = 0;
    START TRANSACTION;
    SET time_zone = "+00:00";
    
    --
    -- Databáze: `maturita`
    --
    
    -- --------------------------------------------------------
    
    --
    -- Struktura tabulky `adresar`
    --
    
    DROP TABLE IF EXISTS `adresar`;
    CREATE TABLE IF NOT EXISTS `adresar` (
      `id` int(5) NOT NULL AUTO_INCREMENT,
      `nazev` varchar(50) COLLATE utf8_czech_ci NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
    
    -- --------------------------------------------------------
    
    --
    -- Struktura tabulky `data`
    --
    
    DROP TABLE IF EXISTS `data`;
    CREATE TABLE IF NOT EXISTS `data` (
      `id` int(5) NOT NULL AUTO_INCREMENT,
      `form` int(5) NOT NULL,
      `json` longtext DEFAULT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
    
    -- --------------------------------------------------------
    
    --
    -- Struktura tabulky `form`
    --
    
    DROP TABLE IF EXISTS `form`;
    CREATE TABLE IF NOT EXISTS `form` (
      `id` int(5) NOT NULL AUTO_INCREMENT,
      `nazev` varchar(50) COLLATE utf8_czech_ci NOT NULL,
      `json` longtext DEFAULT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
    
    -- --------------------------------------------------------
    
    --
    -- Struktura tabulky `kategorie`
    --
    
    DROP TABLE IF EXISTS `kategorie`;
    CREATE TABLE IF NOT EXISTS `kategorie` (
      `id` int(10) NOT NULL AUTO_INCREMENT,
      `nazev` varchar(50) COLLATE utf8_czech_ci NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
    
    -- --------------------------------------------------------
    
    --
    -- Struktura tabulky `prvek`
    --
    
    DROP TABLE IF EXISTS `prvek`;
    CREATE TABLE IF NOT EXISTS `prvek` (
      `id` int(10) NOT NULL AUTO_INCREMENT,
      `nazev` varchar(50) COLLATE utf8_czech_ci NOT NULL,
      `json` longtext DEFAULT NULL,
      `kategorie` int(10) NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
    
    -- --------------------------------------------------------
    
    --
    -- Struktura tabulky `stranka`
    --
    
    DROP TABLE IF EXISTS `stranka`;
    CREATE TABLE IF NOT EXISTS `stranka` (
      `id` int(10) NOT NULL AUTO_INCREMENT,
      `nazev` varchar(50) COLLATE utf8_czech_ci NOT NULL,
      `json` longtext DEFAULT NULL,
      `adresar` int(10) NOT NULL,
      `publikovano` int(1) NOT NULL DEFAULT "0",
      `adresa` varchar(100) COLLATE utf8_czech_ci DEFAULT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;
    COMMIT;
    ';

    $db->insert($sql);
} elseif (isset($_POST['name'])) {
    $data = json_decode(file($rootAddress . 'SRedakt' . $oddelovac . 'DBinfo' . $oddelovac . 'dbinfo.json')[0]);

    $data->webName = $_POST['webName'];
    $data->userName = $_POST['name'];
    $data->userPass = password_hash($_POST['pass'], PASSWORD_DEFAULT);

    $file = fopen($rootAddress . 'SRedakt' . $oddelovac . 'DBinfo' . $oddelovac . 'dbinfo.json', "w");
    fwrite($file, json_encode($data));
    fclose($file);

    unlink($rootAddress . 'SRedakt' . $oddelovac . 'index.php');
    copy($rootAddress . 'SRedakt' . $oddelovac . '2index.php', $rootAddress . 'SRedakt' . $oddelovac . 'index.php');
    unlink($rootAddress . 'SRedakt' . $oddelovac . '2index.php');
    $dirs = scandir($rootAddress . 'SRedakt' . $oddelovac . 'firstSettings');

    for ($i=2; $i < count($dirs); $i++) { 
        unlink($rootAddress . 'SRedakt' . $oddelovac . 'firstSettings' . $oddelovac . $dirs[$i]);
    }
    rmdir($rootAddress . 'SRedakt' . $oddelovac . 'firstSettings');
}
