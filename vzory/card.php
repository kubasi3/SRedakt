<?php
include 'head.php';

class mySQL
{
    private $database;

    public function __construct()
    {
        $this->database = new mysqli('127.0.0.1', 'Maturita', 'mat', 'maturita');
    }

    public function sql($sql)
    {
        if ($this->database->connect_errno) {
            echo "error" . $sql;
        }
        return $this->database->query($sql); 
    }
}

class Cards
{
    private $cards;

    public function __construct($id_prvek_konkretni, $id_prvek_typ, $mysql)
    {
        $sql = "SELECT * from karta WHERE Id_prvek_konkretni = $id_prvek_konkretni AND Id_prvek_typ = $id_prvek_typ";

        $result = $mysql->sql($sql);
        while($row = $result->fetch_assoc()) {
            $this->cards[$row['Id']] = new Card($row['sirka_velikost'], $row['sirka_jednotka'], $row['viska_velikost'], $row['viska_jednotka'], $row['Id'], $row['poradi']);
        }

        $json_cards = json_encode($this->cards);
        echo '<script>
            var json_cards = ' . $json_cards . ';
        </script>';
    }
}


class Card
{
    public $sv;
    public $sj;
    public $vv;
    public $vj;
    public $id;
    public $poradi;

    public function __construct($sirka_velikost, $sirka_jednotka, $viska_velikost, $viska_jednotka, $id, $poradi)
    {
        $this->sv = $sirka_velikost;
        $this->sj = $sirka_jednotka;
        $this->vv = $viska_velikost;
        $this->vj = $viska_jednotka;
        $this->id = $id;
        $this->poradi = $poradi;
    }
}

$mysql = new mySQL();
$carsd = new Cards(1, 1, $mysql);
?>

<p id="test"></p>
<div class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Vestibulum at eros</li>
    </ul>
    <div class="card-body">
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
    </div>
</div>
</body>
</html>
<script>
 //alert(json_cards);

    var Card = function(id) {
        var card = json_cards[id];
        var div = document.createElement('div');
        div.className= 'card col-' + json_cards[id].sv;

        document.body.appendChild(div);
        

    }

    var Main = function() {
        var card = new Card(1);
    }
    window.onload = function(){
        var main = Main();
    }
     
</script>

