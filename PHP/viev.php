<?php
function viev($id) {
    $rootAddress = file('address.txt');
    $rootAddress = $rootAddress[0];
    $oddelovac = $rootAddress[strlen($rootAddress) - 1];
    include_once $rootAddress . 'SRedakt' . $oddelovac . 'PHP' . $oddelovac . 'db.php';
    $db = new DB();

    $sql = 'SELECT json FROM stranka WHERE id = "' . $id . '"';
    $json = $db->select($sql)->fetch_array()[0];
    $json = json_decode($json);

    include $rootAddress . 'SRedakt' . $oddelovac . 'html' . $oddelovac . 'body.php';

    //načítání forms
    $formsData = array();
    if(isset($_GET['forms'])) {
        $forms = explode('/', $_GET['forms']);
        $sql = "SELECT json, form FROM data WHERE id = ?";
        $stmt = $db->stmtStart($sql);
        $stmt->bind_param("i", $idForm);
        for ($i=0; $i < count($forms); $i++) { 
            $idForm = $forms[$i];
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                array_push($formsData, $result->fetch_all(1)[0]);
                $formsData[$i]['json'] = json_decode($formsData[$i]['json']);
            }
        }
        $db->stmtStop($stmt);
    }

    for ($i=0; $i < count($json->forms); $i++) { 
        $form = $json->forms[$i];
        $add = true;
        for($l=0; $l < count($formsData); $l++) {
            if($formsData[$l]['form'] == $form->id) {
                $add = false;
                break;
            }
        }
        if($add) {
            $sql = "SELECT json, form FROM data WHERE form = {$form->id} ORDER BY id DESC LIMIT 1";
            array_push($formsData, $db->select($sql)->fetch_all(1)[0]);
            $formsData[count($formsData) - 1]['json'] = json_decode($formsData[count($formsData) - 1]['json']);
        }
    }

    //načítání templates
    $templatesData = array();
    if(isset($json->templates)) {
        for ($i=0; $i < count(($json->templates)); $i++) { 
            $idTemplate = $json->templates[$i];
            $sql = "SELECT json, id FROM prvek WHERE id = {$idTemplate}";
            array_push($templatesData, $db->select($sql)->fetch_all(1)[0]);
        }
    }
    $json->forms = $formsData;
    $json->templates = $templatesData;
    $json = json_encode($json);

    print(
        '<script>let json = ' .
        $json .
        ";
            
        </script>
        </body>
        </html>"
        );
}
?>