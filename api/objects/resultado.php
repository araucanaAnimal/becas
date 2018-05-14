<?php
class Resultado{
 
    // database connection and table name
    private $conn;
    private $table_name = "`TABLE 1`";
   
 
    // object properties
    public $id;
    public $rut_afiliado;
    public $nombres_afiliado;
    public $apellidos_afiliado;
    public $nombres_postulante;
    public $apellidos_postulante;
    public $nombre_beca;
    public $tipo_premio;
    public $premio;
    public $tiene_premio;
    public $Mensaje;

  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

        // read products
    function buscar($rut){
        $aux = "`rut_afiliado`";

        // select all query
        $query = "SELECT * FROM  "
                    . $this->table_name . "
                WHERE 
                    ". $aux . "
                    = 
                    ". $rut . "   
                ";

        // echo $query;

     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // execute query
        $stmt->execute();
     
        return $stmt;
    }
}