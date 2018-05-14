<?php
class Database{
 
    // specify your own database credentials
    private $host = "127.0.0.1";
    /*
        //conection Local

    private $db_name = "hernan";
    private $username = "vicente";
    private $password = "killua235435";
    public $conn;

    */
  
        //conection server

    private $db_name = "beca";
    private $username = "ams";
    private $password = "araucana2018!";
    public $conn;


  
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>