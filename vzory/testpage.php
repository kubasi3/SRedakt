<!DOCTYPE html>
<html>

<head>
    <title>Maturita</title>
    <link rel="stylesheet" href="/bootstrap/bootstrap.css">
    <script src="data.js"></script>
    <script src="drives.js"></script>
    <script src="rows.js"></script>
    <script src="cols.js"></script>
    <script src="alert.js"></script>
</head>

<body>



<?php
class tes {
    public $elements = [];
}

$test = new tes;
$test-> id = 1;
$test-> typ = 'row';

$test2 = new tes;
$test2-> id = 2;    
$test2-> typ = 'row';

$stranka = [$test, $test2];
$json = json_encode($stranka);



$row1 = new tes;
$row1-> id = 1;
$row1-> typ = 'row';
$row2 = new tes;
$row2-> id = 2;
$row2-> typ = 'row';
$row3 = new tes;
$row3-> id = 3;
$row3-> typ = 'row';

$row4 = new tes;
$row4-> id = 4 ;
$row4-> typ = 'row';
$row5 = new tes;
$row5-> id = 5 ;
$row5-> typ = 'row';

$col1 = new tes;
$col1-> id = 1 ;
$col1-> typ = 'col';
$col1-> width['xs'] = 3;
$col2 = new tes;
$col2-> id = 2 ;
$col2-> typ = 'col';
$col2-> width['xs'] = 6;
$col3 = new tes;
$col3-> id = 3 ;
$col3-> typ = 'col';
$col3-> width['xs'] = 3;

$alert1 = new tes;
$alert1-> id = 1;
$alert1-> typ = 'alert';
$alert1-> styl = 1;
$alert1-> text = 'My first alert';

$stranka = [$row1, $row2];
$json = json_encode($stranka);

$row1-> elements = [];
$col3-> elements = [$alert1];
//$row2-> elements = [$row3];
$row2-> elements = [$col1, $col2, $col3];
//$col2-> elements = [$row4]; 
//$col3-> elements = [$row5];

$json_row[1] = $row1;
$json_row[2] = $row2;
$json_row[3] = $row3;
$json_row[4] = $row4;
$json_row[5] = $row5;
$json_row = json_encode($json_row);

$json_col[1] = $col1;
$json_col[2] = $col2;
$json_col[3] = $col3;
$json_col= json_encode($json_col);

$json_alert[1] = $alert1;
$json_alert = json_encode($json_alert);

echo '<script>
    var json_col = ' . $json_col . ';
    var json_page = ' . $json . ';
    var json_row = ' . $json_row . ';
    var json_alert =' . $json_alert . ';
    </script>';
?>