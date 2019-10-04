<?php
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
?>