<?php
class DB {
    private $conn;
    private $servername;
    private $username;
    private $password;
    private $dbname;

    function __construct()
    {
        $rootAddress = file('address.txt');
        $rootAddress = $rootAddress[0];
        $oddelovac = $rootAddress[strlen($rootAddress) - 1];  
          
        $json = json_decode(file($rootAddress . 'SRedakt' . $oddelovac .'DBinfo' . $oddelovac . 'dbinfo.json')[0]);
        $this->servername = $json->serverName;        
        $this->username = $json->userNameDb;    
        $this->password = $json->password;
        $this->dbname = $json->dbName;
    }

    function conn() {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
            return FALSE;
        } else {
            return TRUE;
        }
    }
    
    function insert($sql) {
        $finish = FALSE;
        if ($this->conn() === TRUE) {
            if ($this->conn->query($sql) === TRUE) {
                $finish = TRUE;
            } 
        }

        $this->conn->close();
        return $finish;
    }

    function getConn() {
        $this->conn();
        return $this->conn;
    }

    function select($sql) {
        $finish = FALSE;
        if ($this->conn() === TRUE) {
            $finish = $this->conn->query($sql);
        } 
        $this->conn->close();
        return $finish;
    }

    function stmtStart($str) {
        $finish = FALSE;
        if ($this->conn() === TRUE) {
            $finish = $this->conn->prepare($str);
        } 
        if($finish === FALSE) {
            return 'eror';
        }
        return $finish;
    }

    function stmtStop($stmt) {
        $stmt->close();
        $this->conn->close();
    }

}
?>