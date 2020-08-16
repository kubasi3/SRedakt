<?php
$rootAddress = file('address.txt');
$rootAddress = $rootAddress[0];
$oddelovac = $rootAddress[strlen($rootAddress) - 1];

if(isset($_POST['nameValid'])) {
    $table = array('adresar', 'kategorie', 'prvek', 'stranka', 'form');
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();

    $aTable = $table[$_POST['table']];
    $sql = "SELECT COUNT(*) num FROM {$aTable} WHERE nazev=?";

    if ($_POST['table'] == 2) {
        $sql = $sql . " AND kategorie=?";

        $stmt = $db->stmtStart($sql);
        $stmt->bind_param("si", $name, $kategorie);

        $name = $_POST['nameValid'];
        $kategorie = $_POST['kategorie'];
    } elseif ($_POST['table'] == 3) {
        $sql = $sql . " AND adresar=?";

        $stmt = $db->stmtStart($sql);
        $stmt->bind_param("si", $name, $adresar);

        $name = $_POST['nameValid'];
        $adresar = $_POST['adresar'];
    } else {
        $stmt = $db->stmtStart($sql);
        $stmt->bind_param("s", $name);
    
        $name = $_POST['nameValid'];
    }
    $stmt->execute();
    print_r($stmt->get_result()->fetch_all(1)[0]['num']);

    $db->stmtStop($stmt);

} elseif(isset($_POST['create'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();
    $table = array('adresar', 'kategorie', 'prvek', 'stranka', 'form');
    
    $table = $table[$_POST['create']];
    

    if ($_POST['create'] == 3) {
        $sql = "INSERT INTO {$table} (nazev, adresar) VALUES (?, ?)";
        $stmt = $db->stmtStart($sql);
        $stmt->bind_param("si", $name, $folder);
        $folder = $_POST['adresar'];
    } elseif ($_POST['create'] == 2) {
        $sql = "INSERT INTO {$table} (nazev, kategorie) VALUES (?, ?)";
        $stmt = $db->stmtStart($sql);
        $stmt->bind_param("si", $name, $folder);
        $folder = $_POST['kategorie'];
    } else {
        $sql = "INSERT INTO {$table} (nazev) VALUES (?)";
        $stmt = $db->stmtStart($sql);
        $stmt->bind_param("s", $name);
    }
    $name = $_POST['name'];
    $stmt->execute();
    $db->stmtStop($stmt);

    $sql = "SELECT id FROM {$table} ORDER BY id DESC LIMIT 1";
    echo($db->select($sql)->fetch_all(1)[0]['id']);
} elseif(isset($_POST['removeId'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();
    $tables = array('adresar', 'kategorie', 'prvek', 'stranka', 'form');

    $table = $tables[$_POST['table']];

    $sql = "DELETE FROM {$table} WHERE id=?";
    $stmt = $db->stmtStart($sql);
    $stmt->bind_param("i", $id);
    $id = $_POST['removeId'];

    $stmt->execute();
    $db->stmtStop($stmt);

    if ($_POST['table'] == 0) {
        $table2 = $tables[3];
    } elseif ($_POST['table'] == 1) {
        $table2 = $tables[2];
    } elseif ($_POST['table'] == 4) {
        $table2 = 'data';
    }
    if ($_POST['table'] == 0 OR $_POST['table'] == 1 OR $_POST['table'] == 4) {
        $sql = "DELETE FROM {$table2} WHERE {$table}=?";
        $stmt = $db->stmtStart($sql);
        $stmt->bind_param("i", $id);

        $stmt->execute();
        $db->stmtStop($stmt);
    }
} elseif(isset($_POST['name'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();
    $table = array('adresar', 'kategorie', 'prvek', 'stranka')[$_POST['table']];

    $sql = "SELECT nazev FROM {$table} WHERE id=?";
    $stmt = $db->stmtStart($sql);
    $stmt->bind_param("i", $id);
    $id = $_POST['name'];

    $stmt->execute();
    print($stmt->get_result()->fetch_all(1)[0]['nazev']);
    $db->stmtStop($stmt);
} elseif(isset($_POST['changeName'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();
    $table = array('adresar', 'kategorie', 'prvek', 'stranka', 'form')[$_POST['table']];

    $sql = "UPDATE {$table} SET nazev=? WHERE id=?";
    $stmt = $db->stmtStart($sql);
    $stmt->bind_param("si", $nazev, $id);
    
    $nazev = $_POST['changeName'];
    $id = $_POST['id'];

    $stmt->execute();
    $db->stmtStop($stmt);
} elseif(isset($_POST['changeFolder'])){
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();
    $tables = array('adresar', 'kategorie', 'prvek', 'stranka');
    
    $table = $tables[$_POST['type']];
    $type = $tables[3 - $_POST['type']];

    $sql = "UPDATE {$table} SET {$type}=? WHERE id =?";
    $stmt = $db->stmtStart($sql);
    $stmt->bind_param("ii", $tabulka, $id);

    $tabulka = $_POST['tabulka'];
    $id = $_POST['changeFolder'];

    $stmt->execute();
    $db->stmtStop($stmt);
} elseif(isset($_POST['json'])) {
    $data = json_decode(file($rootAddress . 'SRedakt' . $oddelovac . 'DBinfo' . $oddelovac . 'dbinfo.json')[0]);
    if ($_POST['json'] == 'serverName') {
        $data->serverName = $_POST['value'];
    } elseif ($_POST['json'] == 'userNameDb') {
        $data->userNameDb = $_POST['value'];
    } elseif ($_POST['json'] == 'dbName') {
        $data->dbName = $_POST['value'];
    } elseif ($_POST['json'] == 'webName') {
        $data->webName = $_POST['value'];
    } elseif ($_POST['json'] == 'userName') {
        $data->userName = $_POST['value'];
    } 

    $file = fopen($rootAddress . 'SRedakt' . $oddelovac . 'DBinfo' . $oddelovac . 'dbinfo.json', "w");
    echo(json_encode($data));
    fwrite($file, json_encode($data));
    fclose($file);
} elseif(isset($_POST['dbControl'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();
    if ($db->conn()) {
        echo('true');
    } else {
        echo('false');
    }
} elseif(isset($_POST['jsonPass'])) {
    $data = json_decode(file($rootAddress . 'SRedakt' . $oddelovac . 'DBinfo' . $oddelovac . 'dbinfo.json')[0]);
    if ($_POST['jsonPass'] == 'password') {
        $data->password = $_POST['value'];
        echo('true');
    } elseif ($_POST['jsonPass'] == 'userPass') {
        if (password_verify($_POST['oldPass'], $data->userPass)) {
            $data->userPass = password_hash($_POST['value'], PASSWORD_DEFAULT);
            echo('true');
        } else {
            echo('oldPassError');
        }
    }

    $file = fopen($rootAddress . 'SRedakt' . $oddelovac . 'DBinfo' . $oddelovac . 'dbinfo.json', "w");
    fwrite($file, json_encode($data));
    fclose($file);
} elseif(isset($_POST['load2'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();
    $table = array('adresar', 'kategorie', 'prvek', 'stranka')[$_POST['table']];

    $sql = "SELECT json FROM {$table} WHERE id = ?";
    $stmt = $db->stmtStart($sql);
    $stmt->bind_param("i", $id);
    $id = $_POST['load2'];
    
    $stmt->execute();
    print($stmt->get_result()->fetch_all(1)[0]['json']);
    $db->stmtStop($stmt);
} elseif(isset($_POST['createForm'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();

    $sql = "INSERT INTO form (nazev, json) VALUES (?, ?)";
    $stmt = $db->stmtStart($sql);
    $stmt->bind_param("ss", $name, $json);
    $json = $_POST['jsonForm'];
    $name = $_POST['createForm'];
    $stmt->execute();
    $db->stmtStop($stmt);

    $sql = "SELECT id FROM form ORDER BY id DESC LIMIT 1";
    echo($db->select($sql)->fetch_all(1)[0]['id']);
} elseif(isset($_POST['saveForm'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();

    $sql = "INSERT INTO data (form, json) VALUES (?, ?)";
    $stmt = $db->stmtStart($sql);
    $stmt->bind_param("is", $form, $json);
    $json = $_POST['sfJSON'];
    $form = $_POST['saveForm'];
    $stmt->execute();
    $db->stmtStop($stmt);

    echo(true);
} elseif(isset($_POST['controlAddress'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();

    $sql = "SELECT COUNT(*) num FROM stranka WHERE adresa=?";
    $stmt = $db->stmtStart($sql);
    $stmt->bind_param("s", $addres);

    $addres = $_POST['controlAddress'];

    $stmt->execute();
    print_r($stmt->get_result()->fetch_all(1)[0]['num']);

    $db->stmtStop($stmt);
} elseif(isset($_POST['public'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();

    $sql = "UPDATE stranka SET adresa=?, publikovano=1 WHERE id=?";
    $stmt = $db->stmtStart($sql);
    $stmt->bind_param("si", $addres, $id);
    $addres = $_POST['public'];
    $id = $_POST['id'];
    $stmt->execute();
    $db->stmtStop($stmt);

    $addres = explode('/', $addres);

    $finalAddres = $rootAddress; 
    

    for ($i=0; $i < count($addres) - 1; $i++) { 
        $files = scandir($finalAddres);
        $new = true;
        for ($l=0; $l < count($files); $l++) { 
            if ($files[$l] == $addres[$i]) {
                $new = false;
            }
        }
        if ($new) {
            mkdir($finalAddres . $oddelovac . $addres[$i]);

            $file = fopen($finalAddres . $oddelovac . $addres[$i] . $oddelovac . 'address.txt', 'w');
            fwrite($file, $rootAddress);
            fclose($file);
        }
        $finalAddres = $finalAddres . $oddelovac . $addres[$i];
    }

    if ($oddelovac == '/') {
        $oddelovac2 = '/';
    } elseif ($oddelovac == '\\') {
        $oddelovac2 = '\\\\';
    }

    $file = fopen($finalAddres . $oddelovac . $addres[count($addres) - 1], 'w');
    fwrite($file, '<?php 
    include "' . $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac2 . 'viev.php";
    viev(' . $id . ');
    ?>');
    fclose($file);
} elseif(isset($_POST['unpublic'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();

    $sql = "SELECT adresa FROM stranka WHERE id=?";
    $stmt = $db->stmtStart($sql);
    $stmt->bind_param("i", $id);
    $id = $_POST['unpublic'];

    $stmt->execute();
    $addres = $stmt->get_result()->fetch_all(1)[0]['adresa'];
    $db->stmtStop($stmt);

    $sql = "UPDATE stranka SET adresa=null, publikovano=0 WHERE id=?";
    $stmt = $db->stmtStart($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $db->stmtStop($stmt);

    $addres = explode('/', $addres);

    $finalAddres = $rootAddress; 

    for ($i=0; $i < count($addres); $i++) { 
        $finalAddres = $finalAddres . $oddelovac . $addres[$i];
    }

    if (file_exists($finalAddres)) {
        unlink($finalAddres);
    }
} elseif(isset($_POST['publicSides'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();

    $sql = "SELECT adresar.nazev nazev, adresar.id id FROM stranka, adresar WHERE publikovano=1 AND adresar.id=stranka.adresar GROUP BY adresar.id";
    $data = $db->select($sql)->fetch_all(1);

    $sides = array();

    for ($i=0; $i < count($data); $i++) { 
        $sql = "SELECT nazev, adresa, id FROM stranka WHERE publikovano=1 AND adresar={$data[$i]['id']}";
        array_push($sides, [$data[$i]['nazev'], $db->select($sql)->fetch_all(1)]);
    }

    echo(json_encode($sides));

} elseif(isset($_POST['adresForm'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();

    $sql = "SELECT json FROM stranka WHERE id=?";
    $stmt = $db->stmtStart($sql);
    $stmt->bind_param("i", $id);
    $id = $_POST['adresForm'];

    $stmt->execute();
    $json = json_decode($stmt->get_result()->fetch_all(1)[0]['json']);
    $db->stmtStop($stmt);

    $sides = array();

    $ides = array();
    $addId = true;
    for ($i=0; $i < count($json->forms); $i++) { 
        $id = $json->forms[$i]->id;
        for ($l=0; $l < count($ides); $l++) { 
            if ($ides[$l] == $id) {
                $addId = false;
            }
        }
        if ($addId) {
            $sql = "SELECT data.id id, data.json json, form.nazev nazev FROM data, form WHERE data.form={$id} AND data.form=form.id";
            array_push($sides, [$db->select($sql)->fetch_all(1)]);
            array_push($ides, $id);
        }
        $addId = true;
    }
    echo(json_encode($sides));
} elseif(isset($_POST['2JSON'])) {
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();
    $tables = array('adresar', 'kategorie', 'prvek', 'stranka', 'form');
    
    $table = $tables[$_POST['table']];

    $sql = "UPDATE {$table} SET json = ? WHERE id = ?";
    $stmt = $db->stmtStart($sql);
    $stmt->bind_param("si", $json, $id);

    $id = $_POST['id'];
    $json = $_POST['2JSON'];

    $stmt->execute();
    $db->stmtStop($stmt);

    echo($json);
}
?>